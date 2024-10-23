/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { PanelEnvelopeFull1 } from './panel';

export interface PlanetSceneGuids {
  sgeo: string;
  dgeo: string;
}

export interface PlanetPhotoDome {
  url: string;
  size: number;
  resolution: number;
}

export interface PlanetVideoDome {
  url: string;
}

export interface PlanetDomes {
  images: PlanetPhotoDome[];
  videos: PlanetVideoDome[];
  imagesActiveIndex: number;
  videosActiveIndex: number;
}

export interface SpawnPhotodome {
  url: string;
  size: number;
  resolution: number;
}

export interface SpawnPosition {
  x: number;
  y: number;
  z: number;
}

export interface SpawnAudioloop {
  url: string;
}

export interface PlanetSpawn {
  id: string;
  photodome: SpawnPhotodome;
  position: SpawnPosition;
  audioloop: SpawnAudioloop;
}

export interface PlanetRaw {
  autoClear: boolean;
  scenes: PlanetSceneGuids;
  domes: PlanetDomes;
  spawns: PlanetSpawn[];
  panels: PanelEnvelopeFull1[];
}

export interface PlanetData {
  object: PlanetRaw;
}

export interface PlanetFull1 {
  name: string;
  guid: string;
  data: PlanetData;
}

export interface PlanetFull2 extends PlanetFull1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}
