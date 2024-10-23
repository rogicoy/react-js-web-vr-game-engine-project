/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import Container, { ActionProps, DataProps } from './Container';
import selectors from 'store/ship/selectors';
import { ReqEventPayload } from 'guixr/event/types';
import * as actions from 'store/ship/actions';
import { ShipSceneGuids } from 'guixr/models/ship';
import { PlanetSceneGuids } from 'guixr/models/planet';

const makeMapStateToProps = (state: any): DataProps => ({
  state: selectors.rootState(state)
});

export const actionCreators: ActionProps = {
  doGetShip: (shipGuid: string) => actions.makeGetShip(shipGuid),
  doGetPlanet: (planetGuid: string) => actions.makeGetPlanet(planetGuid),
  doGetViewer: (viewerGuid: string) => actions.makeGetViewer(viewerGuid),
  doGetShipScenes: (sceneGuids: ShipSceneGuids) =>
    actions.makeGetShipScenes(sceneGuids),
  doGetPlanetScenes: (sceneGuids: PlanetSceneGuids) =>
    actions.makeGetPlanetScenes(sceneGuids),
  doDispatchSystemEvent: (event: ReqEventPayload) =>
    actions.makeDispatchSystemEvent(event),
  doDispatchRemoteEvent: (event: ReqEventPayload) =>
    actions.makeDispatchRemoteEvent(event),
  doDispatchLocalEvent: (event: ReqEventPayload) =>
    actions.makeDispatchLocalEvent(event),
  doWatchShipWebSocket: (shipGuid: string) =>
    actions.makeWatchShipWebSocket(shipGuid)
};

const ShipViewer = connect(makeMapStateToProps, actionCreators)(Container);

export default ShipViewer;
