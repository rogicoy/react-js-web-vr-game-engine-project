/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import XRNRTWebSocketResponseHandler from './response/XRNRTWebSocketResponseHandler';
import XRRTWebSocketResponseHandler from './response/XRRTWebSocketResponseHandler';
import { WebSocketResponseMap } from './response/type';

const WebSocketResponseHandler = (() => {
  const handle = (responseMap: WebSocketResponseMap) => {
    const xrRtResponse = responseMap['xr.rt'];
    const xrNrtResponse = responseMap['xr.nrt'];

    if (xrRtResponse) {
      XRRTWebSocketResponseHandler.handle(xrRtResponse);
    }

    if (xrNrtResponse) {
      XRNRTWebSocketResponseHandler.handle(xrNrtResponse);
    }
  };

  return { handle };
})();

export default WebSocketResponseHandler;
