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
  Worker
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.dgeo';

class DGeoWorker extends AbstractSceneProviderWorker {
  private panelWorker: PanelWorker;

  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerDgeo);
    this.panelWorker = new PanelWorker(WORKER_KIND);
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { dgeo } = handover;

    if (dgeo) {
      const config = JSON.stringify(dgeo.data.object);
      const onSceneLoaded = (scene: BABYLON.Scene) => {
        this.panelWorker.task(handover, (handover) => {
          onSuccess?.();
          onNext?.(handover);
        });
      };

      BABYLON.SceneLoader.ShowLoadingScreen = false;
      BABYLON.SceneLoader.AppendAsync('', `data: ${config}`, scene)
        .then(onSceneLoaded, onFailure)
        .catch((err) => {
          console.error(err);
        });
    } else {
      onFailure?.();
    }
  }

  protected onReset(): void {
    const mutator = this.getSceneMutator();
    this.panelWorker.reset();
    mutator.disposeScene();
  }

  public getChildren(): Worker[] {
    return [this.panelWorker];
  }

  public getSceneMutator(): SceneMutator {
    const sceneManager = SceneManager.getInstance();
    return sceneManager.getDgeoSceneMutator();
  }
}

export default DGeoWorker;
