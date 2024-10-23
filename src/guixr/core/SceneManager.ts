/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import { SceneAccessor, SceneCluster, SceneMutator } from './type';
import SceneHandler from './SceneHandler';
import EventManager from 'guixr/event/EventManager';

class SceneManager {
  public static instance: SceneManager | null = null;

  private canvas: HTMLCanvasElement | null;

  private engine: BABYLON.Engine | null;

  private sgeoSceneHandler: SceneHandler;

  private dgeoSceneHandler: SceneHandler;

  private sshipSceneHandler: SceneHandler;

  private dshipSceneHandler: SceneHandler;

  private constructor() {
    this.canvas = null;
    this.engine = null;

    this.sgeoSceneHandler = new SceneHandler();
    this.dgeoSceneHandler = new SceneHandler();
    this.sshipSceneHandler = new SceneHandler();
    this.dshipSceneHandler = new SceneHandler();
  }

  public static getInstance(): SceneManager {
    if (SceneManager.instance === null) {
      SceneManager.instance = new SceneManager();
    }

    return SceneManager.instance;
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public setEngine(engine: BABYLON.Engine) {
    this.engine = engine;
    this.sgeoSceneHandler.setEngine(engine);
    this.dgeoSceneHandler.setEngine(engine);
    this.sshipSceneHandler.setEngine(engine);
    this.dshipSceneHandler.setEngine(engine);
  }

  public getCanvas(): HTMLCanvasElement | null {
    return this.canvas;
  }

  public resizeCanvas() {
    this.engine?.resize();
  }

  public getEngine(): BABYLON.Engine | null {
    return this.engine;
  }

  public getSgeoSceneAccessor(): SceneAccessor {
    return this.sgeoSceneHandler;
  }

  public getSgeoSceneMutator(): SceneMutator {
    return this.sgeoSceneHandler;
  }

  public getDgeoSceneAccessor(): SceneAccessor {
    return this.dgeoSceneHandler;
  }

  public getDgeoSceneMutator(): SceneMutator {
    return this.dgeoSceneHandler;
  }

  public getSshipSceneAccessor(): SceneAccessor {
    return this.sshipSceneHandler;
  }

  public getSshipSceneMutator(): SceneMutator {
    return this.sshipSceneHandler;
  }

  public getDshipSceneAccessor(): SceneAccessor {
    return this.dshipSceneHandler;
  }

  public getDshipSceneMutator(): SceneMutator {
    return this.dshipSceneHandler;
  }

  private getSceneCluster(): SceneCluster | null {
    const sgeo = this.sgeoSceneHandler.getScene();
    const dgeo = this.dgeoSceneHandler.getScene();
    const sship = this.sshipSceneHandler.getScene();
    const dship = this.dshipSceneHandler.getScene();

    if (sgeo && dgeo && sship && dship) {
      return { sgeo, dgeo, sship, dship };
    }

    return null;
  }

  public runRenderScenes(onSuccess: () => void, onFailure: () => void) {
    const cluster = this.getSceneCluster();

    if (this.engine && cluster) {
      const { sgeo, dgeo, sship, dship } = cluster;

      this.engine.stopRenderLoop();
      this.engine.runRenderLoop(() => {
        if (dship.activeCamera) {
          const { activeCamera } = dship;
          sgeo.activeCamera = activeCamera;
          dgeo.activeCamera = activeCamera;
          sship.activeCamera = activeCamera;

          sgeo.activeCamera.attachControl(true);
          dgeo.activeCamera.attachControl(true);
          sship.activeCamera.attachControl(true);
          dship.activeCamera.attachControl(true);
        }

        sgeo.autoClear = true;
        dgeo.autoClear = false;
        sship.autoClear = false;
        dship.autoClear = false;

        sgeo.render();
        dgeo.render();
        sship.render();
        dship.render();
      });

      sgeo.executeWhenReady(() => {
        dgeo.executeWhenReady(() => {
          sship.executeWhenReady(() => {
            dship.executeWhenReady(() => {
              onSuccess();
            });
          });
        });
      });
    } else {
      onFailure();
    }

    console.log({ pipes: EventManager.getInstance().getEventPipes() });
  }
}

export default SceneManager;
