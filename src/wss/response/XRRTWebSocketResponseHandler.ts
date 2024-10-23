/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/naming-convention */
import EventManager from 'guixr/event/EventManager';
import { WebSocketResponse } from './type';

const XRRTWebSocketResponseHandler = (() => {
  const eventMgr = EventManager.getInstance();

  const systemContextualEventRebounder =
    eventMgr.getSystemContextualEventRebounder();

  const systemWebSocketEventDispatcher =
    eventMgr.getSystemWebSocketEventDispatcher();

  const handleShipArrival = (response: WebSocketResponse) => {
    const { type, args } = response;
    const { planet_guid } = args;

    if (planet_guid) {
      systemContextualEventRebounder.rebound(response);
      systemWebSocketEventDispatcher.dispatchAllEvents({
        trigger: type,
        data: { planet_guid }
      });
    }
  };

  const handleShipDeparture = (response: WebSocketResponse) => {
    const { args, type } = response;
    const { planet_guid } = args;

    if (planet_guid) {
      systemContextualEventRebounder.rebound(response);
      systemWebSocketEventDispatcher.dispatchAllEvents({
        trigger: type,
        data: { planet_guid }
      });
    }
  };

  const handleShipCrew = (response: WebSocketResponse) => {
    const { type, args } = response;
    const { crew } = args;

    if (crew) {
      systemContextualEventRebounder.rebound(response);
      systemWebSocketEventDispatcher.dispatchAllEvents({
        trigger: type,
        data: { crew }
      });
    }
  };

  const handleShipGeo = (response: WebSocketResponse) => {
    const { type, args } = response;
    const { planet_guid } = args;

    if (planet_guid) {
      systemContextualEventRebounder.rebound(response);
      systemWebSocketEventDispatcher.dispatchAllEvents({
        trigger: type,
        data: { planet_guid }
      });
    }
  };

  const handle = (responseList: WebSocketResponse[]) => {
    console.log('Handle websocket response for xr.rt event');
    responseList.forEach((response) => {
      switch (response.type) {
        case 'xr.rt.status.ship.crew':
          handleShipCrew(response);
          break;
        case 'xr.rt.status.ship.geo':
          handleShipGeo(response);
          break;
        case 'xr.rt.ship.arrival':
          handleShipArrival(response);
          break;
        case 'xr.rt.ship.departure':
          handleShipDeparture(response);
          break;
        default:
          systemContextualEventRebounder.rebound(response);
      }
    });
  };

  return { handle };
})();

export default XRRTWebSocketResponseHandler;
