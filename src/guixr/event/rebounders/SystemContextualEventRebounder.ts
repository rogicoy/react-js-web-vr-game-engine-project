/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import EventManager from '../EventManager';
import { ResponseEventPayload } from '../types';
import { SystemEventRebounder } from './types';

export const REBOUNDER_KIND = 'sys.rebounder.contextual';

/**
 * Rebounder component used by Saga to broadcast context specific events as a result
 * of API or Websocket response.
 */
class SystemContextualEventRebounder implements SystemEventRebounder {
  public getRebounderKind(): string {
    return REBOUNDER_KIND;
  }

  /**
   * Notify all ingress callback function subscribing to the given event type.
   * @param event
   */
  public rebound(payload: ResponseEventPayload) {
    const eventMgr = EventManager.getInstance();
    const epiCatalog = eventMgr.getEventPipeIngressCatalog();
    const epiTree = eventMgr.getEventPipeIngressTree();

    // Invoke only the ingress callback functions subscribing to the used event type.
    if (payload.type) {
      epiTree.getCallbackKeysByEventType(payload.type).forEach((key) => {
        console.log('REBOUND', { ...payload, source: REBOUNDER_KIND });
        console.log('INGRESS OF', key);
        console.log('catalog', epiCatalog.getFromCatalog(key));

        epiCatalog.getFromCatalog(key)?.({
          ...payload,
          // At this point, the response from backend does not include the source.
          // Hence, force the source to be this rebounder.
          source: REBOUNDER_KIND
        });
      });
    }
  }
}

export default SystemContextualEventRebounder;
