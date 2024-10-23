/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ReqEventPayload } from 'guixr/event/types';
import { PlanetFull2 } from 'guixr/models/planet';
import { ShipFull2 } from 'guixr/models/ship';
import { SceneFull2 } from 'guixr/models/scene';
import { ViewerFull2 } from 'guixr/models/viewer';
import { ProvisionGuidAmendRecord } from 'guixr/provision/types';

export interface ShipSceneState {
  cam: SceneFull2 | null;
  dship: SceneFull2 | null;
  sship: SceneFull2 | null;
}

export interface PlanetSceneState {
  dgeo: SceneFull2 | null;
  sgeo: SceneFull2 | null;
}

export interface ShipState extends ShipSceneState, PlanetSceneState {
  par: ProvisionGuidAmendRecord;
  ship: ShipFull2 | null;
  planet: PlanetFull2 | null;
  event: ReqEventPayload | null;
  viewer: ViewerFull2 | null;
}
