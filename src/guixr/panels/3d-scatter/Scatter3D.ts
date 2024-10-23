/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import { HolographicButton, ScatterPanel } from '@babylonjs/gui';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { Scatter3DInputs } from './types';

class Scatter3D extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  public build() {
    try {
      const { gui3DMgr } = this.refBundle;
      const { envelope } = this.refData;
      const { inputs, position, scale } = envelope.data.object;

      if (gui3DMgr) {
        const anchor = new BABYLON.TransformNode(`${envelope.guid}-node`);
        const panel = new ScatterPanel();
        panel.margin = 0.2;

        panel.position = new BABYLON.Vector3(
          position.x,
          position.y,
          position.z
        );

        if (scale) {
          panel.scaling = new BABYLON.Vector3(scale.x, scale.y, scale.z);
        }

        gui3DMgr.addControl(panel);
        panel.linkToTransformNode(anchor);

        panel.blockLayout = true;
        (inputs as Scatter3DInputs).forEach((input, index) => {
          const button = new HolographicButton(
            `${envelope.guid}-button-${index}`
          );
          panel.addControl(button);
          button.text = input.name;
          button.onPointerClickObservable.add(() => {
            this.dispatchAllEvents(input);
          });
        });
        panel.blockLayout = false;
      }
    } catch (err) {
      console.error('Scatter3D', err);
    }
  }
}

export default Scatter3D;
