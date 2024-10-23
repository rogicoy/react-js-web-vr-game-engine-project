/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';
import { ShipFull2, ShipSceneGuids } from 'guixr/models/ship';
import { PlanetFull2, PlanetSceneGuids } from 'guixr/models/planet';
import { ViewerFull2 } from 'guixr/models/viewer';
import { ReqEventPayload } from 'guixr/event/types';
import { PlanetSceneState, ShipSceneState } from './models';

export const getShip = createAsyncAction(
  types.GET_SHIP_REQUEST,
  types.GET_SHIP_SUCCESS,
  types.GET_SHIP_FAILURE
)<string, ShipFull2, undefined>();

export const getPlanet = createAsyncAction(
  types.GET_PLANET_REQUEST,
  types.GET_PLANET_SUCCESS,
  types.GET_PLANET_FAILURE
)<string, PlanetFull2, undefined>();

export const getViewer = createAsyncAction(
  types.GET_VIEWER_REQUEST,
  types.GET_VIEWER_SUCCESS,
  types.GET_VIEWER_FAILURE
)<string, ViewerFull2, undefined>();

export const getShipScenes = createAsyncAction(
  types.GET_SHIP_SCENES_REQUEST,
  types.GET_SHIP_SCENES_SUCCESS,
  types.GET_SHIP_SCENES_FAILURE
)<ShipSceneGuids, ShipSceneState, undefined>();

export const getPlanetScenes = createAsyncAction(
  types.GET_PLANET_SCENES_REQUEST,
  types.GET_PLANET_SCENES_SUCCESS,
  types.GET_PLANET_SCENES_FAILURE
)<PlanetSceneGuids, PlanetSceneState, undefined>();

export const dispatchSystemEvent = createAction(
  types.DISPATCH_SYSTEM_EVENT,
  (event: ReqEventPayload) => event
)();

export const dispatchRemoteEvent = createAction(
  types.DISPATCH_REMOTE_EVENT,
  (event: ReqEventPayload) => event
)();

export const dispatchLocalEvent = createAction(
  types.DISPATCH_LOCAL_EVENT,
  (event: ReqEventPayload) => event
)();

export const watchShipWebSocket = createAction(
  types.WATCH_SHIP_SOCKET,
  (guid: string) => guid
)();

export const makeGetShip = (guid: string) => getShip.request(guid);

export const makeGetPlanet = (guid: string) => getPlanet.request(guid);

export const makeGetViewer = (guid: string) => getViewer.request(guid);

export const makeGetShipScenes = (guids: ShipSceneGuids) =>
  getShipScenes.request(guids);

export const makeGetPlanetScenes = (guids: PlanetSceneGuids) =>
  getPlanetScenes.request(guids);

export const makeDispatchSystemEvent = (event: ReqEventPayload) =>
  dispatchSystemEvent(event);

export const makeDispatchRemoteEvent = (event: ReqEventPayload) =>
  dispatchRemoteEvent(event);

export const makeDispatchLocalEvent = (event: ReqEventPayload) =>
  dispatchLocalEvent(event);

export const makeWatchShipWebSocket = (guid: string) =>
  watchShipWebSocket(guid);
