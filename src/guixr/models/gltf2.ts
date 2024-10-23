/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export type Gltf2Type = 'remote' | 'native';

export declare enum TaskType {
  Binary = 'Binary',
  Mesh = 'Mesh',
  Texture = 'Texture'
}

export interface RemoteGltf2Specs {
  taskType: TaskType;
  rootUrl: string;
  sceneFilename: string;
}

export interface Gltf2Raw {
  type: Gltf2Type;
  specs: RemoteGltf2Specs;
}

export interface Gltf2Data {
  object: Gltf2Raw;
}

export interface Gltf2Full1 {
  name: string;
  guid: string;
  data: Gltf2Data;
}

export interface Gltf2Full2 extends Gltf2Full1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}
