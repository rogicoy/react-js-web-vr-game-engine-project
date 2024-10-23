/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import AbstractWorker from './AbstractWorker';
import { WorkCallback, WorkHandover } from '../types';

abstract class AbstractPrimeWorker extends AbstractWorker {
  public constructor(
    workerKind: string,
    parentKind: string,
    notifierKind: LifecycleNotifierKind
  ) {
    super(workerKind, parentKind, notifierKind);
  }

  protected abstract onTask(
    handover: WorkHandover,
    onNext?: WorkCallback,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void;

  public task(handover: WorkHandover, onNext?: WorkCallback) {
    if (!this.isBusy()) {
      this.setBusy();
      this.onTask(
        handover,
        onNext,
        () => this.setCompleted(),
        () => this.setAborted()
      );
    }
  }
}

export default AbstractPrimeWorker;
