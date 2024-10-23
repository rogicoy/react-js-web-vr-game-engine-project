/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

 
/* eslint-disable @typescript-eslint/prefer-readonly */
import { EventEgress, EventIngress } from 'guixr/models/event';
import { EventDispatcher, EventPipeableComponent } from '../types';
import EventManager from '../EventManager';
import { SystemDispatcherPayload } from './type';

export const DISPATCHER_KIND = 'sys.dispatcher.websocket';
export const DISPATCHER_EVENT_TYPE = 'xr.sys.dispatch.websocket';

class SystemWebSocketEventDispatcher
  implements EventDispatcher, EventPipeableComponent
{
  private eventEgress: EventEgress = [
    {
      type: DISPATCHER_EVENT_TYPE
    }
  ];

  private eventIngress: EventIngress = [];

  public getKey(): string {
    return DISPATCHER_KIND;
  }

  public getEventEgress(): EventEgress {
    return this.eventEgress;
  }

  public getEventIngress(): EventIngress {
    return this.eventIngress;
  }

  public dispatchEventByIndex(
    index: number,
    payload?: SystemDispatcherPayload
  ) {
    try {
      const eventMgr = EventManager.getInstance();
      const eventPipe = eventMgr.getEventPipeByKey(DISPATCHER_KIND);

      if (eventPipe) {
        eventPipe.dispatchEvent({
          source: DISPATCHER_KIND,
          type: this.eventEgress[index].type,
          args: payload
        });
      }
    } catch (err) {
      console.error('Failed to dispatch the event.', err);
    }
  }

  public dispatchAllEvents(payload?: SystemDispatcherPayload) {
    for (let index = 0; index < this.eventEgress.length; index++) {
      this.dispatchEventByIndex(index, payload);
    }
  }
}

export default SystemWebSocketEventDispatcher;
