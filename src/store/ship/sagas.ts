/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable import/no-anonymous-default-export */
import { call, put, takeLatest, takeEvery, take } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getAxios } from 'store/axios';
import { getType } from 'typesafe-actions';
import WebSocketChannelCreator from 'wss/WebSocketChannelCreator';
import WebSocketResponseHandler from 'wss/WebSocketResponseHandler';
import * as obsr from './observers';
import * as actions from './actions';
import { WebSocketResponseMap } from 'wss/response/type';
import AuthenticationController from 'auth';

export function* getShip(
  action: ReturnType<typeof actions.getShip.request>
): SagaIterator {
  const guid = action.payload;

  if (guid) {
    const axios = getAxios();

    try {
      const response = yield call(async () => await axios.get(`/removed/${removed}`));

      if (response.status === 200) {
        obsr.notifyShipSuccess(response.data);
        yield put(actions.getShip.success(response.data));
      } else {
        obsr.notifyShipFailure();
        yield put(actions.getShip.failure());
      }
    } catch (err) {
      obsr.notifyShipFailure();
      yield put(actions.getShip.failure());
    }
  }
}

export function* getPlanet(
  action: ReturnType<typeof actions.getPlanet.request>
): SagaIterator {
  const guid = action.payload;

  if (guid) {
    const axios = getAxios();

    try {
      const response = yield call(
        async () => await axios.get(`/removed/${removed}`)
      );

      if (response.status === 200) {
        obsr.notifyPlanetSuccess(response.data);
        yield put(actions.getPlanet.success(response.data));
      } else {
        obsr.notifyPlanetFailure();
        yield put(actions.getPlanet.failure());
      }
    } catch (err) {
      obsr.notifyPlanetFailure();
      yield put(actions.getPlanet.failure());
    }
  }
}

export function* getViewer(
  action: ReturnType<typeof actions.getPlanet.request>
): SagaIterator {
  const guid = action.payload;

  if (guid) {
    const axios = getAxios();

    try {
      const response = yield call(
        async () => await axios.get(`/removed/${removed}`)
      );

      if (response.status === 200) {
        obsr.notifyViewerSuccess(response.data);
        yield put(actions.getViewer.success(response.data));
      } else {
        obsr.notifyViewerFailure();
        yield put(actions.getViewer.failure());
      }
    } catch (err) {
      obsr.notifyViewerFailure();
      yield put(actions.getViewer.failure());
    }
  }
}

export function* getShipScenes(
  action: ReturnType<typeof actions.getShipScenes.request>
): SagaIterator {
  const { cam, dship, sship } = action.payload;
  const axios = getAxios();

  try {
    const rcam = yield call(async () => await axios.get(`/removed/${removed}`));

    if (rcam.status === 200) {
      const rsship = yield call(async () => await axios.get(`/removed/${removed}`));
      const rdship = yield call(async () => await axios.get(`/removed/${removed}`));

      const response = {
        sship: rsship.status === 200 ? rsship.data : null,
        dship: rdship.status === 200 ? rdship.data : null,
        cam: rcam.data
      };

      obsr.notifyShipScenesSuccess(response);
      yield put(actions.getShipScenes.success(response));
    } else {
      obsr.notifyShipScenesFailure();
      yield put(actions.getShipScenes.failure());
    }
  } catch (err) {
    obsr.notifyShipScenesFailure();
    yield put(actions.getShipScenes.failure());
  }
}

export function* getPlanetScenes(
  action: ReturnType<typeof actions.getPlanetScenes.request>
): SagaIterator {
  const { dgeo, sgeo } = action.payload;
  const axios = getAxios();

  try {
    const rsgeo = yield call(async () => await axios.get(`/removed/${removed}`));
    const rdgeo = yield call(async () => await axios.get(`/removed/${removed}`));

    const response = {
      sgeo: rsgeo.status === 200 ? rsgeo.data : null,
      dgeo: rdgeo.status === 200 ? rdgeo.data : null
    };

    obsr.notifyPlanetScenesSuccess(response);
    yield put(actions.getPlanetScenes.success(response));
  } catch (err) {
    obsr.notifyPlanetScenesFailure();
    yield put(actions.getPlanetScenes.failure());
  }
}

function* dispatchEventToWebhook(
  action: ReturnType<typeof actions.dispatchSystemEvent>
): SagaIterator {
  const { payload } = action;
  const { source, type, args } = payload;
  const axios = getAxios();

  try {
    const makeEventHttpsRequest = async () =>
      await axios.post(`removed`, {
        'xr.rt': [{ source, type, args }]
      });

    yield call(makeEventHttpsRequest);
  } catch (err) {
    console.error('Error sending panel event to webhook', err);
  }
}

export function* watchShipWebSocket(
  action: ReturnType<typeof actions.getShip.request>
): SagaIterator {
  const shipGuid = action.payload;
  const token = yield call(AuthenticationController.getToken);
  const socketHost = String(process.env.REACT_APP_WSS_BASE_URL);
  const socketUrl = `${removed}/removed/${removed}/?removed=${removed as string}`;

  const socket = new WebSocket(socketUrl);

  const socketChannel = yield call(WebSocketChannelCreator.create, socket);

  while (true) {
    try {
      const response = yield take(socketChannel);
      const responseMap: WebSocketResponseMap = JSON.parse(response);
      WebSocketResponseHandler.handle(responseMap);
    } catch (err) {
      console.error('Websocket error', err);
    }
  }
}

export default function* () {
  yield takeEvery(getType(actions.dispatchRemoteEvent), dispatchEventToWebhook);
  yield takeLatest(getType(actions.watchShipWebSocket), watchShipWebSocket);
  yield takeLatest(getType(actions.getShip.request), getShip);
  yield takeLatest(getType(actions.getPlanet.request), getPlanet);
  yield takeLatest(getType(actions.getViewer.request), getViewer);
  yield takeLatest(getType(actions.getShipScenes.request), getShipScenes);
  yield takeLatest(getType(actions.getPlanetScenes.request), getPlanetScenes);
}
