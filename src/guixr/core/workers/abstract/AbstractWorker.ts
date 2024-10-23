/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import {
  AbstractLifecycleNotifier,
  LifecycleNotifierKind,
  LifecycleStageExitPolicyTerm,
  LifecycleWorkerStatus
} from 'guixr/core/lifecycle';
import { WorkCallback, WorkHandover, Worker } from '../types';

abstract class AbstractWorker
  extends AbstractLifecycleNotifier
  implements Worker
{
  private workerKind: string;
  private parentKind: string;
  private workerStatus: LifecycleWorkerStatus;

  public constructor(
    workerKind: string,
    parentKind: string,
    notifierKind: LifecycleNotifierKind
  ) {
    super(notifierKind);

    this.workerKind = workerKind;
    this.parentKind = parentKind;
    this.workerStatus = LifecycleWorkerStatus.idle;
    this.setIdle();
  }

  public abstract getChildren(): Worker[];

  protected abstract onReset(): void;

  protected makeTerm(
    defaultTerm: LifecycleStageExitPolicyTerm,
    data?: any
  ): LifecycleStageExitPolicyTerm {
    return defaultTerm;
  }

  public abstract task(
    handover: WorkHandover,
    onNext?: WorkCallback,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void;

  public reset() {
    this.setBusy();
    this.onReset();
    this.setIdle();
  }

  public getParentKind(): string {
    return this.parentKind;
  }

  public getKind(): string {
    return this.workerKind;
  }

  public getStatus(): LifecycleWorkerStatus {
    return this.workerStatus;
  }

  public isIdle() {
    return this.workerStatus === LifecycleWorkerStatus.idle;
  }

  public isBusy() {
    return this.workerStatus === LifecycleWorkerStatus.busy;
  }

  public isAborted() {
    return this.workerStatus === LifecycleWorkerStatus.aborted;
  }

  public isCompleted() {
    return this.workerStatus === LifecycleWorkerStatus.completed;
  }

  protected setIdle() {
    this.workerStatus = LifecycleWorkerStatus.idle;
    this.notify(this.workerStatus);
  }

  protected setBusy() {
    this.workerStatus = LifecycleWorkerStatus.busy;
    this.notify(this.workerStatus);
  }

  protected setAborted() {
    this.workerStatus = LifecycleWorkerStatus.aborted;
    this.notify(this.workerStatus);
  }

  protected setCompleted() {
    this.workerStatus = LifecycleWorkerStatus.completed;
    this.notify(this.workerStatus);
  }
}

export default AbstractWorker;
