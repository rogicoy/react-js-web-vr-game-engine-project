/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import {
  AbstractWorker,
  SceneConsumer,
  WorkCallback,
  WorkHandover
} from 'guixr/core/workers';
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import { SceneAccessor } from 'guixr/core/type';

abstract class AbstractSceneConsumerWorker
  extends AbstractWorker
  implements SceneConsumer
{
  public constructor(
    workerKind: string,
    parentKind: string,
    notifierKind: LifecycleNotifierKind
  ) {
    super(workerKind, parentKind, notifierKind);
  }

  public abstract getSceneAccessor(): SceneAccessor;

  protected abstract onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: WorkCallback,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void;

  public task(handover: WorkHandover, onNext?: WorkCallback) {
    if (!this.isBusy()) {
      const accessor = this.getSceneAccessor();
      const scene = accessor.getScene();

      if (scene) {
        this.setBusy();
        this.onTask(
          scene,
          handover,
          onNext,
          () => this.setCompleted(),
          () => this.setAborted()
        );
      }
    }
  }
}

export default AbstractSceneConsumerWorker;
