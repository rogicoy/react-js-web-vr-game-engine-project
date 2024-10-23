/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface SceneData {
  object: any;
}

export interface SceneFull1 {
  name: string;
  guid: string;
  data: SceneData;
}

export interface SceneFull2 extends SceneFull1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}
