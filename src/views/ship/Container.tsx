/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ReqEventPayload, ResponseEventPayload } from 'guixr/event/types';
import { ShipState } from 'store/ship/models';
import CoreEngine from 'guixr/core/CoreEngine';
import EventManager from 'guixr/event/EventManager';
import { ShipSceneGuids } from 'guixr/models/ship';
import { PlanetSceneGuids } from 'guixr/models/planet';
import {
  LifecycleObserversController,
  LifecycleNotifierKind,
  LifecycleEngineStatus,
  ProvisionLifecycleNotifier
} from 'guixr/core/lifecycle';
import {
  ProvisionChecker,
  PROVISION_CODE_CHECKPOINT1,
  PROVISION_CODE_CHECKPOINT2,
  PROVISION_CODE_CHECKPOINT3,
  PROVISION_CODE_CHECKPOINT4,
  PROVISION_CODE_CHECKPOINT5,
  PROVISION_CODE_CHECKPOINT6,
  PROVISION_CODE_CHECKPOINT7,
  PROVISION_CODE_CHECKPOINT8
} from 'guixr/provision';

export const SHIP_KIND = 'xr.ship';

export const CANVAS_ID = 'xr.canvas';

export interface DataProps {
  state: ShipState;
}

export interface ActionProps {
  doGetShip: (shipGuid: string) => void;
  doGetPlanet: (planetGuid: string) => void;
  doGetViewer: (viewerGuid: string) => void;
  doGetShipScenes: (guids: ShipSceneGuids) => void;
  doGetPlanetScenes: (guids: PlanetSceneGuids) => void;
  doDispatchSystemEvent: (event: ReqEventPayload) => void;
  doDispatchRemoteEvent: (event: ReqEventPayload) => void;
  doDispatchLocalEvent: (event: ReqEventPayload) => void;
  doWatchShipWebSocket: (shipGuid: string) => void;
}

const Container = (props: DataProps & ActionProps) => {
  const params = useParams() as any;
  const [showLoading, setShowLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('');

  const provisionLifecycleNotifier = new ProvisionLifecycleNotifier();

  const handleOnStarting = (
    notifier: string,
    status: string,
    payload?: any
  ) => {
    const coreEngine = CoreEngine.getInstance();

    if (notifier === LifecycleNotifierKind.engine) {
      if (status === LifecycleEngineStatus.initialized) {
        props.doWatchShipWebSocket(params.guid);
      }
    }

    if (notifier === LifecycleNotifierKind.provision && payload) {
      const state = payload as ShipState;
      const { par } = state;

      if (status === PROVISION_CODE_CHECKPOINT1) {
        setLoadingText('Collecting ship information.');
        props.doGetShip(params.guid);
      }

      if (status === PROVISION_CODE_CHECKPOINT2) {
        setLoadingText('Collecting viewer information.');

        if (par.viewer.incomingGuid) {
          props.doGetViewer(par.viewer.incomingGuid);
        }
      }

      if (status === PROVISION_CODE_CHECKPOINT3) {
        setLoadingText('Collecting ship scenes information.');

        if (
          par.camera.incomingGuid &&
          par.sship.incomingGuid &&
          par.dship.incomingGuid
        ) {
          props.doGetShipScenes({
            cam: par.camera.incomingGuid,
            sship: par.sship.incomingGuid,
            dship: par.dship.incomingGuid
          });
        }
      }

      if (status === PROVISION_CODE_CHECKPOINT4) {
        setLoadingText('Collecting planet information.');

        props.doDispatchRemoteEvent({
          type: 'xr.rt.status.ship.geo',
          source: SHIP_KIND,
          args: {}
        });
      }

      if (status === PROVISION_CODE_CHECKPOINT5) {
        setLoadingText('Collecting planet scenes information.');

        if (par.sgeo.incomingGuid && par.dgeo.incomingGuid) {
          props.doGetPlanetScenes({
            sgeo: par.sgeo.incomingGuid,
            dgeo: par.dgeo.incomingGuid
          });
        }
      }

      if (status === PROVISION_CODE_CHECKPOINT6) {
        setLoadingText('Starting the engine.');

        coreEngine.start(
          {
            ship: state.ship,
            planet: state.planet,
            viewer: state.viewer,
            cam: state.cam,
            sship: state.sship,
            dship: state.dship,
            sgeo: state.sgeo,
            dgeo: state.dgeo
          },
          () => setShowLoading(false),
          () => setShowLoading(false)
        );
      }
    }
  };

  const handleOnActive = (notifier: string, status: string, payload?: any) => {
    if (notifier === LifecycleNotifierKind.engine) {
      if (status === LifecycleEngineStatus.active) {
        props.doDispatchRemoteEvent({
          type: 'xr.rt.status.ship.crew',
          source: SHIP_KIND,
          args: {}
        });
      }
    }
  };

  const handleOnActiveArrived = (
    notifier: string,
    status: string,
    payload?: any
  ) => {
    if (notifier === LifecycleNotifierKind.event && payload) {
      const event = payload as ResponseEventPayload;

      if (status === 'xr.sys.dispatch.websocket') {
        if (event.args) {
          const { trigger, data } = event.args;
          if (trigger === 'xr.rt.ship.arrival') {
            props.doGetPlanet(data.planet_guid);
          }
        }
      }
    }

    if (notifier === LifecycleNotifierKind.provision && payload) {
      const state = payload as ShipState;

      if (status === PROVISION_CODE_CHECKPOINT7) {
        const { par } = state;

        if (par.sgeo.incomingGuid && par.dgeo.incomingGuid) {
          props.doGetPlanetScenes({
            sgeo: par.sgeo.incomingGuid,
            dgeo: par.dgeo.incomingGuid
          });
        }
      }

      if (status === PROVISION_CODE_CHECKPOINT8) {
        const coreEngine = CoreEngine.getInstance();

        coreEngine.restart({
          ship: state.ship,
          planet: state.planet,
          viewer: state.viewer,
          cam: state.cam,
          sship: state.sship,
          dship: state.dship,
          sgeo: state.sgeo,
          dgeo: state.dgeo
        });
      }
    }
  };

  useEffect(() => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    const lifecycleObserverCtrl = LifecycleObserversController.getInstance();
    const coreEngine = CoreEngine.getInstance();
    const eventMgr = EventManager.getInstance();
    const hookHandler = eventMgr.getEventHookHandler();

    lifecycleObserverCtrl.addOnStarting({
      key: SHIP_KIND,
      callback: handleOnStarting
    });

    lifecycleObserverCtrl.addOnActive({
      key: SHIP_KIND,
      callback: handleOnActive
    });

    lifecycleObserverCtrl.addOnActiveArrived({
      key: SHIP_KIND,
      callback: handleOnActiveArrived
    });

    coreEngine.initialize(canvas);

    hookHandler.setLocalEventHook((event) => {
      props.doDispatchLocalEvent(event);
    });

    hookHandler.setRemoteEventHook((event) => {
      props.doDispatchRemoteEvent(event);
    });

    hookHandler.setSystemEventHook((event) => {
      props.doDispatchSystemEvent(event);

      const { type, args } = event;
      if (type === 'xr.sys.dispatch.websocket' && args) {
        const { trigger, data } = args;
        if (trigger === 'xr.rt.status.ship.geo') {
          props.doGetPlanet(data.planet_guid);
        }
      }
    });
  }, []);

  useEffect(() => {
    const code = ProvisionChecker.check(props.state.par);
    provisionLifecycleNotifier.notify(code, props.state);
  }, [props.state.par]);

  return (
    <>
      {showLoading && (
        <Box
          component={'p'}
          sx={{
            position: 'absolute',
            inlineSize: '100%',
            insetBlockEnd: '20dvh',
            textAlign: 'center'
          }}
        >
          {`LOADING: ${loadingText}`}
        </Box>
      )}
      <Box
        sx={{
          backgroundImage: showLoading
            ? 'url("/removed")'
            : 'none',
          backgroundPosition: 'center',
          backgroundSize: 'auto',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#070705',
          blockSize: '100%',
          inlineSize: '100%'
        }}
      >
        <canvas
          id={CANVAS_ID}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            touchAction: 'none'
          }}
        ></canvas>
      </Box>
    </>
  );
};

export default Container;
