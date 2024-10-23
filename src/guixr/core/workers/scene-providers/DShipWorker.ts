/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import SceneManager from 'guixr/core/SceneManager';
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import { SceneMutator } from 'guixr/core/type';
import {
  AbstractSceneProviderWorker,
  PanelWorker,
  WorkHandover,
  CameraWorker,
  Worker
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.dship';

class DShipWorker extends AbstractSceneProviderWorker {
  private panelWorker: PanelWorker;
  private cameraWorker: CameraWorker;

  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerDship);
    this.panelWorker = new PanelWorker(WORKER_KIND);
    this.cameraWorker = new CameraWorker(WORKER_KIND);
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { dship } = handover;

    if (dship) {
      const config = JSON.stringify(dship.data.object);
      const onSceneLoaded = (scene: BABYLON.Scene) => {
        this.cameraWorker.task(handover, (handover) => {
          this.panelWorker.task(handover, (handover) => {
            onSuccess?.();
            onNext?.(handover);
          });
        });
      };

      BABYLON.SceneLoader.ShowLoadingScreen = false;
      BABYLON.SceneLoader.AppendAsync('', `data: ${config}`, scene)
        .then(onSceneLoaded, onFailure)
        .catch(() => onFailure?.());
    } else {
      onFailure?.();
    }
  }

  protected onReset(): void {
    const mutator = this.getSceneMutator();
    this.panelWorker.reset();
    this.cameraWorker.reset();
    mutator.disposeScene();
  }

  public getChildren(): Worker[] {
    return [this.panelWorker];
  }

  public getSceneMutator(): SceneMutator {
    const sceneManager = SceneManager.getInstance();
    return sceneManager.getDshipSceneMutator();
  }
}

export default DShipWorker;
