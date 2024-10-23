/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ResponseEventPayload } from '../types';

/**
 * Triggers an event.
 */
export interface SystemEventRebounder {
  // Notifies all ingress callback functions that subscribes to the event type.
  rebound: (payload: ResponseEventPayload) => void;

  // Returns the rebounder's kind.
  getRebounderKind: () => string;
}
