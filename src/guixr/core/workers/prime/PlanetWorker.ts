/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import {
  AbstractPrimeWorker,
  DGeoWorker,
  SGeoWorker,
  WorkHandover,
  Worker
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.planet';

class PlanetWorker extends AbstractPrimeWorker {
  private sgeoWorker: SGeoWorker;
  private dgeoWorker: DGeoWorker;

  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerPlanet);
    this.sgeoWorker = new SGeoWorker(WORKER_KIND);
    this.dgeoWorker = new DGeoWorker(WORKER_KIND);
  }

  protected onTask(
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { planet } = handover;

    if (planet) {
      this.sgeoWorker.task(handover, (handover) => {
        this.dgeoWorker.task(handover, (handover) => {
          onSuccess?.();
          onNext?.(handover);
        });
      });
    } else {
      onFailure?.();
    }
  }

  protected onReset(): void {
    this.sgeoWorker.reset();
    this.dgeoWorker.reset();
  }

  public getChildren(): Worker[] {
    return [this.sgeoWorker, this.dgeoWorker];
  }
}

export default PlanetWorker;
