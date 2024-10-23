/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import {
  EVENT_TYPE_NODE_SEPARATOR,
  LOCAL_EVENT_MULTID_WHITELIST,
  REMOTE_EVENT_MULTID_WHITELIST,
  SYS_EVENT_MULTID_WHITELIST
} from '../organizers/constants';

/**
 * Helper to validate the context of the event.
 */
const EventTypeContextValidator = (() => {
  const isValidType = (eventType: string, whiteList: string[][]): boolean => {
    const nodeKeys = eventType.split(EVENT_TYPE_NODE_SEPARATOR);

    for (let i = 0; i < nodeKeys.length && i < whiteList.length; i++) {
      if (!whiteList[i].includes(nodeKeys[i])) {
        return false;
      }
    }
    return true;
  };

  return {
    // Validates if the type is local event.
    isLocalEventType: (type: string): boolean =>
      isValidType(type, LOCAL_EVENT_MULTID_WHITELIST),

    // Validates if the type is remote event.
    isRemoteEventType: (type: string): boolean =>
      isValidType(type, REMOTE_EVENT_MULTID_WHITELIST),

    // Validates if the type is system event.
    isSystemEventType: (type: string): boolean =>
      isValidType(type, SYS_EVENT_MULTID_WHITELIST)
  };
})();

export default EventTypeContextValidator;
