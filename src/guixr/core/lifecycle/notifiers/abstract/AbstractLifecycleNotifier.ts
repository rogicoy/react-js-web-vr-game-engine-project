/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import LifecycleObserversController from '../../observers/LifecycleObserversController';
import { LifecycleObserverContext } from '../../observers/types';
import LifecycleSentinel from '../../sentinel/LifecycleSentinel';
import {
  LifecycleStage,
  LifecycleStageExitPolicyTerm
} from '../../sentinel/types';
import { LifecycleNotifier, LifecycleNotifierKind } from '../types';

abstract class AbstractLifecycleNotifier implements LifecycleNotifier {
  private kind: LifecycleNotifierKind;

  public constructor(key: LifecycleNotifierKind) {
    this.kind = key;
  }

  /**
   * Creates a new policy term or returns the default term.
   * @param defaultTerm
   * @param data
   */
  protected abstract makeTerm(
    defaultTerm: LifecycleStageExitPolicyTerm,
    data?: any
  ): LifecycleStageExitPolicyTerm;

  /**
   * Returns all the keys from the given lifecycle stage.
   * @param stage
   * @returns
   */
  private getObserverKeys(
    stage: LifecycleStage
  ): IterableIterator<string> | null {
    const controller = LifecycleObserversController.getInstance();

    switch (stage) {
      case LifecycleStage.inactive:
        return controller.onInactive().getObserverKeys();
      case LifecycleStage.starting:
        return controller.onStarting().getObserverKeys();
      case LifecycleStage.stopping:
        return controller.onStopping().getObserverKeys();
      case LifecycleStage.active:
        return controller.onActive().getObserverKeys();
      case LifecycleStage.activeArrived:
        return controller.onActiveArrived().getObserverKeys();
      case LifecycleStage.activeDeparting:
        return controller.onActiveDeparting().getObserverKeys();
      default:
        return null;
    }
  }

  /**
   * Returns the observer with the given key from the given lifecycle stage.
   * @param stage
   * @param key
   * @returns
   */
  private getObserver(
    stage: LifecycleStage,
    key: string
  ): LifecycleObserverContext | null {
    const controller = LifecycleObserversController.getInstance();

    switch (stage) {
      case LifecycleStage.inactive:
        return controller.onInactive().getObserver(key);
      case LifecycleStage.starting:
        return controller.onStarting().getObserver(key);
      case LifecycleStage.stopping:
        return controller.onStopping().getObserver(key);
      case LifecycleStage.active:
        return controller.onActive().getObserver(key);
      case LifecycleStage.activeArrived:
        return controller.onActiveArrived().getObserver(key);
      case LifecycleStage.activeDeparting:
        return controller.onActiveDeparting().getObserver(key);
      default:
        return null;
    }
  }

  /**
   * Notifies all the observers of the current lifecycle stage.
   * @param status    - status value of the notifier instance.
   * @param payload   - additional data of the notifier instance.
   */
  public notify(status: string, payload?: any) {
    const sentinel = LifecycleSentinel.getInstance();
    const defTerm = { notifier: this.kind, value1: status };

    const useTerm = this.makeTerm(defTerm, payload);
    const stage = sentinel.getStage(useTerm);
    const keys = this.getObserverKeys(stage);

    // TODO: Remove this log.
    console.log('LIFECYCLE:', stage, useTerm);

    if (keys) {
      while (true) {
        const next = keys.next();
        if (next.done) {
          break;
        }

        const obsr = this.getObserver(stage, next.value);
        if (obsr && !obsr.disable) {
          // Only the enabled observers are going to be notified.
          obsr.callback(this.kind, status, payload);

          if (obsr.terminant) {
            // The retrieved observer is going to be disabled if it has a
            // terminant and its values match the kind of the notifier
            // instance and the passed status.

            obsr.disable =
              obsr.terminant.notifier === this.kind &&
              obsr.terminant.status === status;
          }
        }
      }
    }
  }

  /**
   * Returns the kind of the notifier instance.
   * @returns
   */
  public getNotifierKind(): string {
    return this.kind;
  }
}

export default AbstractLifecycleNotifier;
