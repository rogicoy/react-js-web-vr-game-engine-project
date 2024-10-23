/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';

export interface SceneAccessor {
  getScene: () => BABYLON.Scene | null;
  hasScene: () => boolean;
}

export interface SceneMutator extends SceneAccessor {
  setEngine: (engine: BABYLON.Engine) => void;
  createScene: () => BABYLON.Scene | null;
  disposeScene: () => void;
}

export interface SceneCluster {
  sgeo: BABYLON.Scene;
  dgeo: BABYLON.Scene;
  sship: BABYLON.Scene;
  dship: BABYLON.Scene;
}
