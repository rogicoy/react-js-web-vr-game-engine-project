/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { XRMotionComponentIds } from './types';

class XRExperience extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  public build() {
    try {
      const { scene } = this.getReferenceBundle();

      const handleComponent = (
        id: string,
        motion: BABYLON.WebXRAbstractMotionController
      ) => {
        const component = motion.getComponent(id);

        if (component) {
          component.onButtonStateChangedObservable.add(
            (eventData, eventState) => {
              this.dispatchAllEvents({
                isPressed: component.pressed,
                isTouched: component.touched,
                componentId: id,
                handness: motion.handness,
                type: component.type,
                value: component.value
              });
            }
          );
        }
      };

      scene
        .createDefaultXRExperienceAsync()
        .then((xr) => {
          xr.input.onControllerAddedObservable.add((controller) => {
            controller.onMotionControllerInitObservable.add((motion) => {
              Object.values(XRMotionComponentIds).forEach((id) =>
                handleComponent(id, motion)
              );
            });
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }
}

export default XRExperience;
