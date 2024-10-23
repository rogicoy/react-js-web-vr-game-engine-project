/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { EventEgress, EventIngress } from 'guixr/models/event';
import { WebSocketResponse } from 'wss/response/type';

export interface ReqEventPayload {
  source: string;
  type: string;
  args?: any;
  data?: any;
}

export type ResponseEventPayload = ReqEventPayload | WebSocketResponse;

export type EventCallback = (event: ResponseEventPayload) => void;

export interface EventDispatcher {
  dispatchEventByIndex: (index: number) => void;
  dispatchAllEvents: () => void;
}

export interface EventPipeableComponent {
  getKey: () => string;
  getEventEgress: () => EventEgress;
  getEventIngress: () => EventIngress;
}
