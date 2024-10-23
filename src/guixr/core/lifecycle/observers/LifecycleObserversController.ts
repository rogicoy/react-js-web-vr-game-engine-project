/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */

import { LifecycleStage } from '../sentinel/types';
import LifecycleObserverGroup from './LifecycleObserverGroup';
import { LifecycleObserverContext } from './types';

class LifecycleObserversController {
  private static instance: LifecycleObserversController | null = null;

  private inactive: LifecycleObserverGroup;

  private starting: LifecycleObserverGroup;

  private stopping: LifecycleObserverGroup;

  private active: LifecycleObserverGroup;

  private activeArrived: LifecycleObserverGroup;

  private activeDeparting: LifecycleObserverGroup;

  private constructor() {
    this.inactive = new LifecycleObserverGroup(LifecycleStage.inactive);
    this.starting = new LifecycleObserverGroup(LifecycleStage.starting);
    this.stopping = new LifecycleObserverGroup(LifecycleStage.stopping);
    this.active = new LifecycleObserverGroup(LifecycleStage.active);
    this.activeArrived = new LifecycleObserverGroup(
      LifecycleStage.activeArrived
    );
    this.activeDeparting = new LifecycleObserverGroup(
      LifecycleStage.activeDeparting
    );
  }

  public static getInstance(): LifecycleObserversController {
    if (LifecycleObserversController.instance === null) {
      LifecycleObserversController.instance =
        new LifecycleObserversController();
    }

    return LifecycleObserversController.instance;
  }

  public onInactive(): LifecycleObserverGroup {
    return this.inactive;
  }

  public onStarting(): LifecycleObserverGroup {
    return this.starting;
  }

  public onStopping(): LifecycleObserverGroup {
    return this.stopping;
  }

  public onActive(): LifecycleObserverGroup {
    return this.active;
  }

  public onActiveArrived(): LifecycleObserverGroup {
    return this.activeArrived;
  }

  public onActiveDeparting(): LifecycleObserverGroup {
    return this.activeDeparting;
  }

  public addOnInactive(context: LifecycleObserverContext) {
    this.inactive.addObserver(context);
  }

  public addOnStarting(context: LifecycleObserverContext) {
    this.starting.addObserver(context);
  }

  public addOnStopping(context: LifecycleObserverContext) {
    this.stopping.addObserver(context);
  }

  public addOnActive(context: LifecycleObserverContext) {
    this.active.addObserver(context);
  }

  public addOnActiveArrived(context: LifecycleObserverContext) {
    this.activeArrived.addObserver(context);
  }

  public addOnActiveDeparting(context: LifecycleObserverContext) {
    this.activeDeparting.addObserver(context);
  }
}

export default LifecycleObserversController;
