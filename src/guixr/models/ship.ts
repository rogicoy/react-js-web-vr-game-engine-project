/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { PanelEnvelopeFull1 } from './panel';

export interface ShipSceneGuids {
  cam: string;
  sship: string;
  dship: string;
}

export interface ShipRaw {
  viewer: string;
  scenes: ShipSceneGuids;
  panels: PanelEnvelopeFull1[];
}

export interface ShipData {
  object: ShipRaw;
}

export interface ShipFull1 {
  name: string;
  guid: string;
  data: ShipData;
}

export interface ShipFull2 extends ShipFull1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}
