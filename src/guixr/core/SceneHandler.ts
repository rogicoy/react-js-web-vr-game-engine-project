/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import { SceneMutator } from './type';

class SceneHandler implements SceneMutator {
  private engine: BABYLON.Engine | null;
  private scene: BABYLON.Scene | null;

  public constructor() {
    this.engine = null;
    this.scene = null;
  }

  public hasScene() {
    return this.scene !== null;
  }

  public getScene(): BABYLON.Scene | null {
    return this.scene;
  }

  public setEngine(engine: BABYLON.Engine) {
    this.engine = engine;
  }

  public createScene(): BABYLON.Scene | null {
    if (this.engine) {
      this.scene = new BABYLON.Scene(this.engine);
    }

    return this.scene;
  }

  public disposeScene() {
    this.scene?.dispose();
    this.scene = null;
  }
}

export default SceneHandler;
