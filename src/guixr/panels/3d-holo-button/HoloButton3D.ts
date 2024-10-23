/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import { HolographicButton } from '@babylonjs/gui';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { EventCallback } from 'guixr/event/types';
import EventManager from 'guixr/event/EventManager';

class HoloButton3D extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  public build() {
    try {
      const { gui3DMgr } = this.refBundle;

      if (gui3DMgr) {
        const { envelope } = this.refData;
        const { specs, position, inputs } = envelope.data.object;

        const eventMgr = EventManager.getInstance();
        const pipe = eventMgr.getEventPipeByKey(envelope.guid);
        const button = new HolographicButton(`${envelope.guid}-holo-btn`);
        gui3DMgr.addControl(button);

        button.position = new BABYLON.Vector3(
          position.x,
          position.y,
          position.z
        );

        button.text = specs.text;

        button.onPointerClickObservable.add(() => {
          this.dispatchAllEvents(inputs);
        });

        pipe?.getEventPipeIngressHandler().setCallback(this.makeIngress());
      }
    } catch (err) {
      console.error('HoloButton3D', err);
    }
  }

  private makeIngress(): EventCallback {
    return (event) => {
      console.log('ingress called', this.refData.envelope.guid, event);
    };
  }
}

export default HoloButton3D;
