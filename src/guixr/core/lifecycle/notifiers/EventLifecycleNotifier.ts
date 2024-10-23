/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ReqEventPayload, ResponseEventPayload } from 'guixr/event/types';
import AbstractLifecycleNotifier from './abstract/AbstractLifecycleNotifier';
import { LifecycleStageExitPolicyTerm } from '../sentinel/types';
import { LifecycleNotifierKind } from './types';

/**
 * Lifecycle notifier intended for the system events.
 */
class EventLifecycleNotifier extends AbstractLifecycleNotifier {
  public constructor() {
    super(LifecycleNotifierKind.event);
  }

  /**
   * Creates a new policy term or returns the default term.
   * @param defaultTerm
   * @param data
   * @returns
   */
  protected makeTerm(
    defaultTerm: LifecycleStageExitPolicyTerm,
    data?: ReqEventPayload | ResponseEventPayload
  ): LifecycleStageExitPolicyTerm {
    if (data) {
      const { args, type } = data;

      if (
        args &&
        type === defaultTerm.value1 &&
        type === 'xr.sys.dispatch.websocket'
      ) {
        // In a xr.sys.dispatch.websocket event, we need to get the trigger value
        // from the payload and assign it to the value2 property of the policy term.
        // This is because there are two events involved in a websocket event.
        // value1 should be the kind of the websocket dispatch event, while value2
        // is the kind of the original event that caused the websocket dispatch
        // event to be triggered.

        return {
          notifier: defaultTerm.notifier,
          value1: defaultTerm.value1,
          value2: args.trigger
        };
      }
    }

    return defaultTerm;
  }
}

export default EventLifecycleNotifier;
