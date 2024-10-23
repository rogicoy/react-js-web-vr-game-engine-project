/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import {
  AbstractPrimeWorker,
  DShipWorker,
  SShipWorker,
  WorkHandover,
  Worker
} from 'guixr/core/workers';

export const WORKER_KIND = 'sys.worker.ship';

class ShipWorker extends AbstractPrimeWorker {
  private sshipWorker: SShipWorker;
  private dshipWorker: DShipWorker;

  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerShip);

    this.sshipWorker = new SShipWorker(WORKER_KIND);
    this.dshipWorker = new DShipWorker(WORKER_KIND);
  }

  protected onTask(
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const { ship } = handover;

    if (ship) {
      this.sshipWorker.task(handover, (handover) => {
        this.dshipWorker.task(handover, (handover) => {
          onSuccess?.();
          onNext?.(handover);
        });
      });
    } else {
      onFailure?.();
    }
  }

  protected onReset(): void {
    this.sshipWorker.reset();
    this.dshipWorker.reset();
  }

  public getChildren(): Worker[] {
    return [this.sshipWorker, this.dshipWorker];
  }
}

export default ShipWorker;
