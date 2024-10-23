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
  PhotodomeWorker,
  SkyboxWorker,
  VideodomeWorker,
  WorkHandover,
  Worker
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.sgeo';

class SGeoWorker extends AbstractSceneProviderWorker {
  private photodomeWorker: PhotodomeWorker;
  private videodomeWorker: VideodomeWorker;
  private skyboxWorker: SkyboxWorker;

  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerSgeo);
    this.photodomeWorker = new PhotodomeWorker(WORKER_KIND);
    this.videodomeWorker = new VideodomeWorker(WORKER_KIND);
    this.skyboxWorker = new SkyboxWorker(WORKER_KIND);
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { sgeo } = handover;

    if (sgeo) {
      const config = JSON.stringify(sgeo.data.object);
      const onSceneLoaded = (scene: BABYLON.Scene) => {
        this.photodomeWorker.task(handover, (handover) => {
          this.videodomeWorker.task(handover, (handover) => {
            this.skyboxWorker.task(handover, (handover) => {
              onSuccess?.();
              onNext?.(handover);
            });
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
    this.photodomeWorker.reset();
    this.videodomeWorker.reset();
    this.skyboxWorker.reset();
    mutator.disposeScene();
  }

  public getChildren(): Worker[] {
    return [this.photodomeWorker, this.videodomeWorker, this.skyboxWorker];
  }

  public getSceneMutator(): SceneMutator {
    const sceneManager = SceneManager.getInstance();
    return sceneManager.getSgeoSceneMutator();
  }
}

export default SGeoWorker;
