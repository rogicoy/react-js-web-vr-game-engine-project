/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface WebSocketResponse {
  source: string;
  type: string;
  args: any;
  sender_sub: string;
  sender_username: string;
  guid: string;
  created_utc: string;
}

export interface WebSocketResponseMap {
  'xr.rt'?: WebSocketResponse[];
  'xr.nrt'?: WebSocketResponse[];
}
