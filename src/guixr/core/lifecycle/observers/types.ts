/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export type LifecycleObserverCallback = (
  notifier: string,
  status: string,
  data?: any
) => void;

export interface LifecycleObserverTerminant {
  notifier: string;
  status: string;
}

export interface LifecycleObserverContext {
  key: string;
  callback: LifecycleObserverCallback;
  disable?: boolean;
  terminant?: LifecycleObserverTerminant;
}

export interface LifecycleObserverContextGroup {
  observers: Map<string, LifecycleObserverContext>;
  disable?: boolean;
}
