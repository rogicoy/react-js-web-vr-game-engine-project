/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import {
  AbstractWorker,
  SceneProvider,
  WorkCallback,
  WorkHandover
} from 'guixr/core/workers';
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import { SceneMutator } from 'guixr/core/type';
import { SceneFull2 } from 'guixr/models/scene';

abstract class AbstractSceneProviderWorker
  extends AbstractWorker
  implements SceneProvider
{
  public constructor(
    workerKind: string,
    parentKind: string,
    notifierKind: LifecycleNotifierKind
  ) {
    super(workerKind, parentKind, notifierKind);
  }

  public abstract getSceneMutator(): SceneMutator;

  protected abstract onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: WorkCallback,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void;

  private applyLights(scene: BABYLON.Scene, camera: SceneFull2) {
    try {
      const { lights } = camera.data.object;
      if (lights) {
        for (const light of lights) {
          if (scene.lights.filter((i) => i.id === light.id).length === 0) {
            BABYLON.Light.Parse(light, scene);
          }
        }
      }
    } catch (err) {
      console.error('Failed to apply lights.', err);
    }
  }

  public task(handover: WorkHandover, onNext?: WorkCallback) {
    if (!this.isBusy()) {
      const mutator = this.getSceneMutator();

      if (mutator.hasScene()) {
        if (this.isCompleted()) {
          onNext?.(handover);
        }
      } else {
        this.setBusy();
        const scene = mutator.createScene();

        if (scene) {
          const { cam } = handover;
          if (cam) {
            this.applyLights(scene, cam);
          }

          this.onTask(
            scene,
            handover,
            onNext,
            () => this.setCompleted(),
            () => this.setAborted()
          );
        } else {
          this.setAborted();
        }
      }
    }
  }
}

export default AbstractSceneProviderWorker;
