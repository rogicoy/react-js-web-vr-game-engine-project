/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { PlanetFull2 } from 'guixr/models/planet';
import { SceneFull2 } from 'guixr/models/scene';
import { ShipFull2 } from 'guixr/models/ship';
import { ViewerFull2 } from 'guixr/models/viewer';
import { ShipSceneState, PlanetSceneState } from './models';

export type ObserverEvent = 'success' | 'failure';

export type Observer<P> = (event: ObserverEvent, payload?: P) => void;

export interface Observers {
  ship: Array<Observer<ShipFull2>>;
  planet: Array<Observer<PlanetFull2>>;
  viewer: Array<Observer<ViewerFull2>>;
  cam: Array<Observer<SceneFull2>>;
  dship: Array<Observer<SceneFull2>>;
  sship: Array<Observer<SceneFull2>>;
  dgeo: Array<Observer<SceneFull2>>;
  sgeo: Array<Observer<SceneFull2>>;
  shipScenes: Array<Observer<ShipSceneState>>;
  planetScenes: Array<Observer<PlanetSceneState>>;
}

const instance: Observers = {
  ship: [],
  planet: [],
  viewer: [],
  cam: [],
  dship: [],
  sship: [],
  dgeo: [],
  sgeo: [],
  shipScenes: [],
  planetScenes: []
};

export const addShipObserver = (obsr: Observer<ShipFull2>) => {
  instance.ship.push(obsr);
};

export const clearShipObserver = () => {
  instance.ship = [];
};

export const addPlanetObserver = (obsr: Observer<PlanetFull2>) => {
  instance.planet.push(obsr);
};

export const clearPlanetObserver = () => {
  instance.planet = [];
};

export const addViewerObserver = (obsr: Observer<ViewerFull2>) => {
  instance.viewer.push(obsr);
};

export const clearViewerObserver = () => {
  instance.viewer = [];
};

export const addCamObserver = (obsr: Observer<SceneFull2>) => {
  instance.cam.push(obsr);
};

export const clearCamObserver = () => {
  instance.cam = [];
};

export const addDshipObserver = (obsr: Observer<SceneFull2>) => {
  instance.dship.push(obsr);
};

export const clearDshipObserver = () => {
  instance.dship = [];
};

export const addSshipObserver = (obsr: Observer<SceneFull2>) => {
  instance.sship.push(obsr);
};

export const clearSshipObserver = () => {
  instance.sship = [];
};

export const addDgeoObserver = (obsr: Observer<SceneFull2>) => {
  instance.dgeo.push(obsr);
};

export const clearDgeoObserver = () => {
  instance.dgeo = [];
};

export const addSgeoObserver = (obsr: Observer<SceneFull2>) => {
  instance.sgeo.push(obsr);
};

export const clearSgeoObserver = () => {
  instance.sgeo = [];
};

export const addShipScenesObserver = (obsr: Observer<ShipSceneState>) => {
  instance.shipScenes.push(obsr);
};

export const clearShipScenesObserver = () => {
  instance.shipScenes = [];
};

export const addPlanetScenesObserver = (obsr: Observer<PlanetSceneState>) => {
  instance.planetScenes.push(obsr);
};

export const clearPlanetScenesObserver = () => {
  instance.planetScenes = [];
};

export const notifyShipSuccess = (payload: ShipFull2) => {
  instance.ship.forEach((obsr) => obsr('success', payload));
};

export const notifyShipFailure = () => {
  instance.ship.forEach((obsr) => obsr('failure'));
};

export const notifyPlanetSuccess = (payload: PlanetFull2) => {
  instance.planet.forEach((obsr) => obsr('success', payload));
};

export const notifyPlanetFailure = () => {
  instance.planet.forEach((obsr) => obsr('failure'));
};

export const notifyViewerSuccess = (payload: ViewerFull2) => {
  instance.viewer.forEach((obsr) => obsr('success', payload));
};

export const notifyViewerFailure = () => {
  instance.viewer.forEach((obsr) => obsr('failure'));
};

export const notifyCamSuccess = (payload: SceneFull2) => {
  instance.cam.forEach((obsr) => obsr('success', payload));
};

export const notifyCamFailure = () => {
  instance.cam.forEach((obsr) => obsr('failure'));
};

export const notifyDshipSuccess = (payload: SceneFull2) => {
  instance.dship.forEach((obsr) => obsr('success', payload));
};

export const notifyDshipFailure = () => {
  instance.dship.forEach((obsr) => obsr('failure'));
};

export const notifySshipSuccess = (payload: SceneFull2) => {
  instance.sship.forEach((obsr) => obsr('success', payload));
};

export const notifySshipFailure = () => {
  instance.sship.forEach((obsr) => obsr('failure'));
};

export const notifyDgeoSuccess = (payload: SceneFull2) => {
  instance.dgeo.forEach((obsr) => obsr('success', payload));
};

export const notifyDgeoFailure = () => {
  instance.dgeo.forEach((obsr) => obsr('failure'));
};

export const notifySgeoSuccess = (payload: SceneFull2) => {
  instance.sgeo.forEach((obsr) => obsr('success', payload));
};

export const notifySgeoFailure = () => {
  instance.sgeo.forEach((obsr) => obsr('failure'));
};

export const notifyShipScenesSuccess = (payload: ShipSceneState) => {
  instance.shipScenes.forEach((obsr) => obsr('success', payload));
};

export const notifyShipScenesFailure = () => {
  instance.shipScenes.forEach((obsr) => obsr('failure'));
};

export const notifyPlanetScenesSuccess = (payload: PlanetSceneState) => {
  instance.planetScenes.forEach((obsr) => obsr('success', payload));
};

export const notifyPlanetScenesFailure = () => {
  instance.planetScenes.forEach((obsr) => obsr('failure'));
};
