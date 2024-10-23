/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import { CylinderPanel, HolographicButton } from '@babylonjs/gui';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { Cylinder3DInputs } from './types';

class Cylinder3D extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  public build() {
    try {
      const { gui3DMgr } = this.refBundle;
      const { guid, data } = this.refData.envelope;
      const { inputs, position, scale } = data.object;

      if (gui3DMgr) {
        const anchor = new BABYLON.TransformNode(`${guid}-node`);
        const panel = new CylinderPanel();
        panel.margin = 0.2;

        panel.position = new BABYLON.Vector3(
          position.x,
          position.y,
          position.z
        );

        panel.scaling = new BABYLON.Vector3(scale.x, scale.y, scale.z);

        gui3DMgr.addControl(panel);
        panel.linkToTransformNode(anchor);

        panel.blockLayout = true;
        (inputs as Cylinder3DInputs).forEach((input, index) => {
          const button = new HolographicButton(`${guid}-button-${index}`);
          panel.addControl(button);
          button.text = input.name;
          button.onPointerClickObservable.add(() => {
            this.dispatchAllEvents(input);
          });
        });
        panel.blockLayout = false;
      }
    } catch (err) {
      console.error('Cylinder3D', err);
    }
  }
}

export default Cylinder3D;
