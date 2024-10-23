/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import { PlanetSceneState, ShipState, ShipSceneState } from './models';
import * as actions from './actions';
import { ShipFull2 } from 'guixr/models/ship';
import { PlanetFull2 } from 'guixr/models/planet';
import { ViewerFull2 } from 'guixr/models/viewer';

export const initState: ShipState = {
  par: {
    amendIndices: [],
    ship: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    planet: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    viewer: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    camera: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    sgeo: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    dgeo: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    sship: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    },
    dship: {
      incomingGuid: null,
      activeGuid: null,
      amendCount: 0
    }
  },
  ship: null,
  planet: null,
  event: null,
  viewer: null,
  cam: null,
  dship: null,
  sship: null,
  dgeo: null,
  sgeo: null
};

const shipReducer = produce(
  (draft: Draft<ShipState>, action: ActionType<typeof actions>): ShipState => {
    const onShipSuccess = (data: ShipFull2) => {
      draft.ship = data;
      draft.par.ship.amendCount++;
      draft.par.ship.incomingGuid = null;
      draft.par.ship.activeGuid = data.guid;
      draft.par.amendIndices = [0];

      draft.par.viewer.incomingGuid = data.data.object.viewer;
      draft.par.camera.incomingGuid = data.data.object.scenes.cam;
      draft.par.sship.incomingGuid = data.data.object.scenes.sship;
      draft.par.dship.incomingGuid = data.data.object.scenes.dship;
    };

    const onPlanetSuccess = (data: PlanetFull2) => {
      draft.planet = data;
      draft.par.planet.amendCount++;
      draft.par.planet.incomingGuid = null;
      draft.par.planet.activeGuid = data.guid;
      draft.par.amendIndices = [5];

      draft.par.sgeo.incomingGuid = data.data.object.scenes.sgeo;
      draft.par.dgeo.incomingGuid = data.data.object.scenes.dgeo;
    };

    const onViewerSuccess = (data: ViewerFull2) => {
      draft.viewer = data;
      draft.par.viewer.amendCount++;
      draft.par.viewer.incomingGuid = null;
      draft.par.viewer.activeGuid = data.guid;
      draft.par.amendIndices = [1];
    };

    const onShipScenesSuccess = (data: ShipSceneState) => {
      draft.par.amendIndices = [];

      if (data.cam) {
        draft.cam = data.cam;
        draft.par.camera.amendCount++;
        draft.par.camera.incomingGuid = null;
        draft.par.camera.activeGuid = data.cam.guid;
        draft.par.amendIndices.push(2);
      }

      if (data.sship) {
        draft.sship = data.sship;
        draft.par.sship.amendCount++;
        draft.par.sship.incomingGuid = null;
        draft.par.sship.activeGuid = data.sship.guid;
        draft.par.amendIndices.push(3);
      }

      if (data.dship) {
        draft.dship = data.dship;
        draft.par.dship.amendCount++;
        draft.par.dship.incomingGuid = null;
        draft.par.dship.activeGuid = data.dship.guid;
        draft.par.amendIndices.push(4);
      }
    };

    const onPlanetScenesSuccess = (data: PlanetSceneState) => {
      draft.par.amendIndices = [];

      if (data.sgeo) {
        draft.sgeo = data.sgeo;
        draft.par.sgeo.amendCount++;
        draft.par.sgeo.incomingGuid = null;
        draft.par.sgeo.activeGuid = data.sgeo.guid;
        draft.par.amendIndices.push(6);
      }

      if (data.dgeo) {
        draft.dgeo = data.dgeo;
        draft.par.dgeo.amendCount++;
        draft.par.dgeo.incomingGuid = null;
        draft.par.dgeo.activeGuid = data.dgeo.guid;
        draft.par.amendIndices.push(7);
      }
    };

    switch (action.type) {
      case getType(actions.dispatchSystemEvent):
      case getType(actions.dispatchRemoteEvent):
      case getType(actions.dispatchLocalEvent):
        draft.event = action.payload;
        return draft;
      case getType(actions.getShip.success):
        onShipSuccess(action.payload);
        return draft;
      case getType(actions.getPlanet.success):
        onPlanetSuccess(action.payload);
        return draft;
      case getType(actions.getViewer.success):
        onViewerSuccess(action.payload);
        return draft;
      case getType(actions.getShipScenes.success):
        onShipScenesSuccess(action.payload);
        return draft;
      case getType(actions.getPlanetScenes.success):
        onPlanetScenesSuccess(action.payload);
        return draft;
      default:
        return draft;
    }
  },
  initState
);

export default shipReducer;
