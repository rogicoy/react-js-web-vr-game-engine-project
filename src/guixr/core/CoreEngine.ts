/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { BABYLON } from '@babylonjs/viewer';
import {
  LifecycleNotifierKind,
  LifecycleEngineStatus,
  AbstractLifecycleNotifier,
  LifecycleStageExitPolicyTerm
} from 'guixr/core/lifecycle';
import {
  PlanetWorker,
  ShipWorker,
  ViewerWorker,
  WorkHandover
} from 'guixr/core/workers';
import SceneManager from './SceneManager';

export const ENGINE_KIND = 'sys.core.engine';

class CoreEngine extends AbstractLifecycleNotifier {
  private static instance: CoreEngine | null = null;

  private status: LifecycleEngineStatus;
  private viewerWorker: ViewerWorker;
  private shipWorker: ShipWorker;
  private planetWorker: PlanetWorker;

  private constructor() {
    super(LifecycleNotifierKind.engine);
    this.viewerWorker = new ViewerWorker(ENGINE_KIND);
    this.shipWorker = new ShipWorker(ENGINE_KIND);
    this.planetWorker = new PlanetWorker(ENGINE_KIND);
    this.status = LifecycleEngineStatus.uninitialized;
  }

  public static getInstance(): CoreEngine {
    if (CoreEngine.instance === null) {
      CoreEngine.instance = new CoreEngine();
    }

    return CoreEngine.instance;
  }

  private changeStatus(status: LifecycleEngineStatus) {
    this.status = status;
    this.notify(status);
  }

  protected makeTerm(
    defaultTerm: LifecycleStageExitPolicyTerm,
    data?: any
  ): LifecycleStageExitPolicyTerm {
    return defaultTerm;
  }

  public getEngineKind(): string {
    return ENGINE_KIND;
  }

  public getStatus(): LifecycleEngineStatus {
    return this.status;
  }

  public initialize(canvas: HTMLCanvasElement) {
    this.changeStatus(LifecycleEngineStatus.initializing);

    const engine = new BABYLON.Engine(canvas, true);
    const sceneManager = SceneManager.getInstance();

    window.addEventListener('resize', () => engine.resize());
    sceneManager.setCanvas(canvas);
    sceneManager.setEngine(engine);

    this.changeStatus(LifecycleEngineStatus.initialized);
  }

  private runWorkers(
    handover: WorkHandover,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    this.viewerWorker.task(handover, (handover) => {
      this.shipWorker.task(handover, (handover) => {
        this.planetWorker.task(handover, (handover) => {
          const sceneManager = SceneManager.getInstance();
          sceneManager.runRenderScenes(onSuccess, onFailure);
        });
      });
    });
  }

  public start(
    handover: WorkHandover,
    onSuccess?: () => void,
    onFailure?: () => void
  ) {
    const onRunSuccess = () => {
      this.changeStatus(LifecycleEngineStatus.active);
      onSuccess?.();
    };

    const onRunFailure = () => {
      this.changeStatus(LifecycleEngineStatus.inactive);
      onFailure?.();
    };

    this.changeStatus(LifecycleEngineStatus.starting);
    this.runWorkers(handover, onRunSuccess, onRunFailure);
  }

  public restart(
    handover: WorkHandover,
    onSuccess?: () => void,
    onFailure?: () => void
  ) {
    const onRunSuccess = () => {
      this.changeStatus(LifecycleEngineStatus.active);
      onSuccess?.();
    };

    const onRunFailure = () => {
      this.changeStatus(LifecycleEngineStatus.inactive);
      onFailure?.();
    };

    this.changeStatus(LifecycleEngineStatus.starting);
    this.planetWorker?.reset();
    this.runWorkers(handover, onRunSuccess, onRunFailure);
  }
}

export default CoreEngine;
