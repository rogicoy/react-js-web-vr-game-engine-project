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

export const WORKER_KIND = 'sys.worker.photodome';

class PhotodomeWorker extends AbstractSceneConsumerWorker {
  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerPdome);
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
      try {
        const { images, imagesActiveIndex } = planet.data.object.domes;
        const { url, size, resolution } = images[imagesActiveIndex];
        const name = `${WORKER_KIND}.${imagesActiveIndex}`;

        const dome = new BABYLON.PhotoDome(
          name,
          url,
          { size, resolution },
          scene
        );

        dome.imageMode = BABYLON.PhotoDome.MODE_MONOSCOPIC;

        onSuccess?.();
        onNext?.(handover);
      } catch (err) {
        onFailure?.();
        onNext?.(handover);
      }
    } else {
      onFailure?.();
    }
  }

  protected onReset(): void {}

  public getChildren(): Worker[] {
    return [];
  }

  public getSceneAccessor(): SceneAccessor {
    const sceneManager = SceneManager.getInstance();
    const parentKind = this.getParentKind();

    switch (parentKind) {
      case WorkerKinds.sgeoWorker:
        return sceneManager.getSgeoSceneAccessor();
      case WorkerKinds.dgeoWorker:
        return sceneManager.getDgeoSceneAccessor();
      case WorkerKinds.dshipWorker:
        return sceneManager.getDshipSceneAccessor();
      case WorkerKinds.sshipWorker:
      default:
        return sceneManager.getSshipSceneAccessor();
    }
  }
}

export default PhotodomeWorker;
