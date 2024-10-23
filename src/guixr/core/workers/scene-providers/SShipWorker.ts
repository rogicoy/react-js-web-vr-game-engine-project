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
  WorkHandover,
  Worker
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.sship';

class SShipWorker extends AbstractSceneProviderWorker {
  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerSship);
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (ho: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { sship } = handover;

    if (sship && scene) {
      const config = JSON.stringify(sship.data.object);
      const onSceneLoaded = (scene: BABYLON.Scene) => {
        onSuccess?.();
        onNext?.(handover);
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
    mutator.disposeScene();
  }

  public getChildren(): Worker[] {
    return [];
  }

  public getSceneMutator(): SceneMutator {
    const sceneManager = SceneManager.getInstance();
    return sceneManager.getSshipSceneMutator();
  }
}

export default SShipWorker;
