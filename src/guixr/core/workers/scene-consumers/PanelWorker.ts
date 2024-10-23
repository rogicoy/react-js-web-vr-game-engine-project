/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import { GUI3DManager } from '@babylonjs/gui';
import { LifecycleNotifierKind } from 'guixr/core/lifecycle';
import {
  AbstractSceneConsumerWorker,
  WorkHandover,
  Worker,
  WorkerKinds
} from 'guixr/core/workers';
import { PanelEnvelopeFull1 } from 'guixr/models/panel';
import PanelKinds from 'guixr/panels/kinds';
import { ShipFull2 } from 'guixr/models/ship';
import { PlanetFull2 } from 'guixr/models/planet';
import PanelFactory from 'guixr/panels/PanelFactory';
import SceneManager from 'guixr/core/SceneManager';
import { SceneAccessor } from 'guixr/core/type';
import { Panel } from 'guixr/panels/types';

export const WORKER_KIND = 'sys.worker.panel';

class PanelWorker extends AbstractSceneConsumerWorker {
  private gui3DMgr: GUI3DManager | null;
  private assetsMgr: BABYLON.AssetsManager | null;
  private builtPanels: Panel[];

  public constructor(parentKind: string) {
    super(WORKER_KIND, parentKind, LifecycleNotifierKind.workerPanel);
    this.gui3DMgr = null;
    this.assetsMgr = null;
    this.builtPanels = [];
  }

  private isValidPanelKind(panel: PanelEnvelopeFull1): boolean {
    switch (panel.data.object.kind) {
      case PanelKinds.plugin:
      case PanelKinds.holoButton3D:
      case PanelKinds.cylinder3D:
      case PanelKinds.plane3D:
      case PanelKinds.scatter3D:
      case PanelKinds.sphere3D:
      case PanelKinds.textWriter3D:
      case PanelKinds.remoteGlb:
      case PanelKinds.remoteGltf2:
      case PanelKinds.xrSandbox:
      case PanelKinds.xrExperience:
        return true;
      default:
        return false;
    }
  }

  public isPanelEnabled(panel: PanelEnvelopeFull1): boolean {
    const isEnabled = panel.data.object?.enabled;
    return typeof isEnabled === 'undefined' ? true : isEnabled;
  }

  private filter(payload: ShipFull2 | PlanetFull2): PanelEnvelopeFull1[] {
    return payload.data.object.panels.filter((panel) => {
      const isValidKind = this.isValidPanelKind(panel);
      const isEnabled = this.isPanelEnabled(panel);

      return isValidKind && isEnabled;
    });
  }

  private buildPanels(
    payload: ShipFull2 | PlanetFull2,
    shipGuid: string,
    planetGuid: string,
    canvas: HTMLCanvasElement,
    engine: BABYLON.Engine,
    scene: BABYLON.Scene,
    gui3DMgr: GUI3DManager,
    assetsMgr: BABYLON.AssetsManager
  ): number {
    const envelopes = this.filter(payload);
    this.builtPanels = [];

    for (const envelope of envelopes) {
      const panel = PanelFactory.create(
        {
          gui3DMgr,
          assetsMgr,
          scene,
          canvas,
          engine
        },
        {
          envelope,
          shipGuid,
          planetGuid
        }
      );

      if (panel) {
        this.builtPanels.push(panel);
        panel.build();
      }
    }

    assetsMgr.load();

    return envelopes.length - this.builtPanels.length;
  }

  private getBuildPayload(
    handover: WorkHandover
  ): PlanetFull2 | ShipFull2 | null {
    switch (this.getParentKind()) {
      case WorkerKinds.sgeoWorker:
      case WorkerKinds.dgeoWorker:
        return handover.planet;
      case WorkerKinds.sshipWorker:
      case WorkerKinds.dshipWorker:
        return handover.ship;
      default:
        return null;
    }
  }

  private getShipGuid(handover: WorkHandover): string | null {
    return handover.ship ? handover.ship.guid : null;
  }

  private getPlanetGuid(handover: WorkHandover): string | null {
    return handover.planet ? handover.planet.guid : null;
  }

  protected onTask(
    scene: BABYLON.Scene,
    handover: WorkHandover,
    onNext?: (handover: WorkHandover) => void,
    onSuccess?: () => void,
    onFailure?: () => void
  ): void {
    const sceneManager = SceneManager.getInstance();
    const canvas = sceneManager.getCanvas();
    const engine = sceneManager.getEngine();
    const payload = this.getBuildPayload(handover);
    const shipGuid = this.getShipGuid(handover);
    const planetGuid = this.getPlanetGuid(handover);

    if (payload && shipGuid && planetGuid && canvas && engine) {
      this.gui3DMgr = new GUI3DManager(scene);
      this.assetsMgr = new BABYLON.AssetsManager(scene);
      const unbuildCount = this.buildPanels(
        payload,
        shipGuid,
        planetGuid,
        canvas,
        engine,
        scene,
        this.gui3DMgr,
        this.assetsMgr
      );

      if (unbuildCount > 0) {
        console.warn(`Warning: ${unbuildCount} panels were not built.`);
      }

      onSuccess?.();
      onNext?.(handover);
    } else {
      onFailure?.();
    }
  }

  protected onReset(): void {
    this.gui3DMgr?.dispose();
    this.assetsMgr?.reset();

    this.builtPanels.forEach((panel) => {
      panel.destroy();
    });

    this.builtPanels = [];
  }

  public getChildren(): Worker[] {
    return [];
  }

  public getSceneAccessor(): SceneAccessor {
    const sceneManager = SceneManager.getInstance();
    const parentKind = this.getParentKind();

    switch (parentKind) {
      case WorkerKinds.sgeoWorker:
        return sceneManager.getSgeoSceneAccessor();
      case WorkerKinds.dgeoWorker:
        return sceneManager.getDgeoSceneAccessor();
      case WorkerKinds.dshipWorker:
        return sceneManager.getDshipSceneAccessor();
      case WorkerKinds.sshipWorker:
      default:
        return sceneManager.getSshipSceneAccessor();
    }
  }
}

export default PanelWorker;
