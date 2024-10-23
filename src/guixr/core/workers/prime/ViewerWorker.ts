/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { DefaultViewer, viewerManager } from '@babylonjs/viewer';
import SceneManager from 'guixr/core/SceneManager';
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import { AbstractPrimeWorker, WorkHandover, Worker } from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.viewer';

class ViewerWorker extends AbstractPrimeWorker {
  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerViewer);
  }

  protected onTask(
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const sceneManager = SceneManager.getInstance();
    const canvas = sceneManager.getCanvas();
    const { viewer } = handover;

    if (canvas && viewer) {
      void new DefaultViewer(canvas, viewer.data.object);

      viewerManager
        .getViewerPromiseById(canvas.id)
        .then((viewer) => {
          onSuccess?.();
          onNext?.(handover);
        })
        .catch((err) => {
          console.error(err);
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
}

export default ViewerWorker;
