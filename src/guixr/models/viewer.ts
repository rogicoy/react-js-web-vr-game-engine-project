/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface ViewerData {
  object: any;
}

export interface ViewerFull1 {
  name: string;
  guid: string;
  data: ViewerData;
}

export interface ViewerFull2 extends ViewerFull1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}
