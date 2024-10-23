/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { WebSocketResponse } from './type';

const XRNRTWebSocketResponseHandler = (() => {
  const handle = (responseList: WebSocketResponse[]) => {
    console.log('Handle websocket response for xr.nrt event');
    // TODO: To handle.
  };

  return { handle };
})();

export default XRNRTWebSocketResponseHandler;
