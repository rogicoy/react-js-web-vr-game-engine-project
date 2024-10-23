/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import SceneManager from 'guixr/core/SceneManager';
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import { SceneAccessor } from 'guixr/core/type';
import {
  AbstractSceneConsumerWorker,
  WorkHandover,
  Worker,
  WorkerKinds
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.skybox';

class SkyboxWorker extends AbstractSceneConsumerWorker {
  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerSkybox);
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { planet } = handover;

    if (planet) {
      onSuccess?.();
      onNext?.(handover);
    } else {
      onFailure?.();
    }
  }

  public onReset(): void {}

  public getChildren(): Worker[] {
    return [];
  }

  public getSceneAccessor(): SceneAccessor {
    const sceneManager = SceneManager.getInstance();
    const parentKind = this.getParentKind();

    switch (parentKind) {
      case WorkerKinds.dgeoWorker:
        return sceneManager.getDgeoSceneAccessor();
      case WorkerKinds.sshipWorker:
        return sceneManager.getSshipSceneAccessor();
      case WorkerKinds.dshipWorker:
        return sceneManager.getDshipSceneAccessor();
      case WorkerKinds.sgeoWorker:
      default:
        return sceneManager.getSgeoSceneAccessor();
    }
  }
}

export default SkyboxWorker;