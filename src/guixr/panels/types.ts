/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import { GUI3DManager } from '@babylonjs/gui';
import { PanelEnvelopeFull1 } from 'guixr/models/panel';
import { EventDispatcher, EventPipeableComponent } from 'guixr/event/types';

export interface PanelReferenceBundle {
  canvas: HTMLCanvasElement;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  assetsMgr: BABYLON.AssetsManager;
  gui3DMgr: GUI3DManager;
}

export interface PanelReferenceData {
  envelope: PanelEnvelopeFull1;
  shipGuid: string | null;
  planetGuid: string | null;
}

export interface Panel extends EventDispatcher, EventPipeableComponent {
  getReferenceBundle: () => PanelReferenceBundle;
  getReferenceData: () => PanelReferenceData;
  build: () => void;
  destroy: () => void;
}
