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
import FreeCameraPointersInput from './FreeCameraPointerInput';
import {
  AbstractSceneConsumerWorker,
  WorkHandover,
  Worker,
  WorkerKinds
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.camera';

const VALID_CAMERA_TYPE = ['FreeCamera', 'UniversalCamera'];

class CameraWorker extends AbstractSceneConsumerWorker {
  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerCamera);
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { cam } = handover;

    if (cam) {
      const config = JSON.stringify(cam.data.object);
      BABYLON.SceneLoader.AppendAsync('', `data: ${config}`, scene)
        .then((scene) => {
          if (scene.activeCamera) {
            const { activeCamera } = scene;
            const cameraType = activeCamera.getClassName() ?? 'N/A';

            if (VALID_CAMERA_TYPE.includes(cameraType)) {
              const camera = activeCamera as BABYLON.FreeCamera;

              // Remove the default pointer inputs attached to camera
              const mouse = camera.inputs.attached.mouse;
              camera.inputs.remove(mouse);

              const touch = camera.inputs.attached.touch;
              camera.inputs.remove(touch);

              // Attach our custom pointer input class with mobile support to camera
              const freeInput = new FreeCameraPointersInput();
              camera.inputs.add(freeInput);
            }

            onSuccess?.();
            onNext?.(handover);
          } else {
            onFailure?.();
          }
        })
        .catch(() => {
          onFailure?.();
        });
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

export default CameraWorker;
