/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export enum LifecycleNotifierKind {
  provision = 'removed',
  event = 'removed',
  engine = 'removed',
  workerCamera = 'removed',
  workerPlanet = 'removed',
  workerShip = 'removed',
  workerViewer = 'removed',
  workerDgeo = 'removed',
  workerSgeo = 'removed',
  workerDship = 'removed',
  workerSship = 'removed',
  workerAudio = 'removed',
  workerPanel = 'removed',
  workerPdome = 'removed',
  workerVdome = 'removed',
  workerSkybox = 'removed'
}

export enum LifecycleEngineStatus {
  uninitialized = 'removed',
  initializing = 'removed',
  initialized = 'removed',
  starting = 'removed',
  stopping = 'removed',
  active = 'removed',
  inactive = 'removed'
}

export enum LifecycleWorkerStatus {
  idle = 'removed',
  busy = 'removed',
  aborted = 'removed',
  completed = 'removed'
}

export interface LifecycleNotifier {
  notify: (status: string, payload?: any) => void;
  getNotifierKind: () => string;
}
