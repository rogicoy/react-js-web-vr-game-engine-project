/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */

import { LifecycleStage } from '../sentinel/types';
import {
  LifecycleObserverContext,
  LifecycleObserverContextGroup
} from './types';

class LifecycleObserverGroup {
  private contextGroup: LifecycleObserverContextGroup;
  private stage: LifecycleStage;

  public constructor(stage: LifecycleStage, disable?: boolean) {
    this.stage = stage;
    this.contextGroup = {
      observers: new Map(),
      disable
    };
  }

  public addObserver(context: LifecycleObserverContext) {
    this.contextGroup.observers.set(context.key, context);
  }

  public getObserver(key: string): LifecycleObserverContext | null {
    const { observers, disable } = this.contextGroup;
    return disable ? null : observers.get(key) ?? null;
  }

  public getObserverKeys(): IterableIterator<string> {
    return this.contextGroup.observers.keys();
  }

  public getGroupStage(): string {
    return this.stage;
  }
}

export default LifecycleObserverGroup;
