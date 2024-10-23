/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { PlanetFull2 } from 'guixr/models/planet';
import { SceneFull2 } from 'guixr/models/scene';
import { ShipFull2 } from 'guixr/models/ship';
import { ViewerFull2 } from 'guixr/models/viewer';
import { SceneAccessor, SceneMutator } from '../type';

export interface WorkHandover {
  ship: ShipFull2 | null;
  planet: PlanetFull2 | null;
  viewer: ViewerFull2 | null;
  cam: SceneFull2 | null;
  sship: SceneFull2 | null;
  dship: SceneFull2 | null;
  sgeo: SceneFull2 | null;
  dgeo: SceneFull2 | null;
}

export type WorkCallback = (handover: WorkHandover) => void;

export interface Worker {
  task: (handover: WorkHandover, onNext?: WorkCallback) => void;
  reset: () => void;
  getKind: () => string;
  getParentKind: () => string;
  getChildren: () => Worker[];
  isIdle: () => boolean;
  isBusy: () => boolean;
  isCompleted: () => boolean;
  isAborted: () => boolean;
}

export interface SceneProvider {
  getSceneMutator: () => SceneMutator;
}

export interface SceneConsumer {
  getSceneAccessor: () => SceneAccessor;
}
