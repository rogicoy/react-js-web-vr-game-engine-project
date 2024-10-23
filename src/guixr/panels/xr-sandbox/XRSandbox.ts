/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { XRMotionComponentIds } from './types';

class XRSandbox extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  public build() {
    try {
      const { scene } = this.getReferenceBundle();

      const leftBoxTrigger = BABYLON.MeshBuilder.CreateBox(
        'leftBoxTrigger',
        {},
        scene
      );

      const leftBoxSqueeze = BABYLON.MeshBuilder.CreateBox(
        'leftBoxSqueeze',
        {},
        scene
      );

      const leftSphereTouchpad = BABYLON.MeshBuilder.CreateSphere(
        'leftSphereTouchpad',
        { diameter: 0.8 },
        scene
      );

      const leftSphereYButton = BABYLON.MeshBuilder.CreateSphere(
        'leftSphereYButton',
        { diameter: 1 },
        scene
      );

      const leftSphereXButton = BABYLON.MeshBuilder.CreateSphere(
        'leftSphereXButton',
        { diameter: 1 },
        scene
      );

      const leftBoxThumbstick = BABYLON.MeshBuilder.CreateBox(
        'leftBoxThumbstick',
        { size: 0.5 },
        scene
      );

      const rightBoxTrigger = BABYLON.MeshBuilder.CreateBox(
        'rightBoxTrigger',
        {},
        scene
      );

      const rightBoxSqueeze = BABYLON.MeshBuilder.CreateBox(
        'rightBoxSqueeze',
        {},
        scene
      );

      const rightSphereTouchpad = BABYLON.MeshBuilder.CreateSphere(
        'rightSphereTouchpad',
        { diameter: 0.8 },
        scene
      );

      const rightSphereBButton = BABYLON.MeshBuilder.CreateSphere(
        'rightSphereBButton',
        { diameter: 1 },
        scene
      );

      const rightSphereAButton = BABYLON.MeshBuilder.CreateSphere(
        'rightSphereAButton',
        { diameter: 1 },
        scene
      );

      const rightBoxThumbstick = BABYLON.MeshBuilder.CreateBox(
        'rightBoxThumbstick',
        { size: 0.5 },
        scene
      );

      const centerBoxOthers = BABYLON.MeshBuilder.CreateBox(
        'centerBoxOthers',
        { size: 0.5 },
        scene
      );

      leftBoxTrigger.position = new BABYLON.Vector3(-2.5, 1, 3);
      leftBoxSqueeze.position = new BABYLON.Vector3(-2.5, -1, 3);
      leftSphereTouchpad.position = new BABYLON.Vector3(-1.5, 1, 3);
      leftSphereYButton.position = new BABYLON.Vector3(-2, 0, 3);
      leftSphereXButton.position = new BABYLON.Vector3(-2, 0, 2);
      leftBoxThumbstick.position = new BABYLON.Vector3(-1, 0, 1);

      rightBoxTrigger.position = new BABYLON.Vector3(2.5, 1, 3);
      rightBoxSqueeze.position = new BABYLON.Vector3(2.5, -1, 3);
      rightSphereTouchpad.position = new BABYLON.Vector3(1.5, 1, 3);
      rightSphereBButton.position = new BABYLON.Vector3(2, 0, 3);
      rightSphereAButton.position = new BABYLON.Vector3(2, 0, 2);
      rightBoxThumbstick.position = new BABYLON.Vector3(1, 0, 1);

      centerBoxOthers.position = new BABYLON.Vector3(0, 0, 1);

      const onLeftHandness = (
        id: string,
        ctr: BABYLON.WebXRControllerComponent
      ) => {
        switch (id) {
          case XRMotionComponentIds.xrStandardTrigger:
            handleComponent(id, leftBoxTrigger, ctr);
            break;
          case XRMotionComponentIds.xrStandardSqueeze:
            handleComponent(id, leftBoxSqueeze, ctr);
            break;
          case XRMotionComponentIds.xrStandardThumbstick:
            handleComponent(id, leftBoxThumbstick, ctr);
            break;
          case XRMotionComponentIds.xButton:
            handleComponent(id, leftSphereXButton, ctr);
            break;
          case XRMotionComponentIds.yButton:
            handleComponent(id, leftSphereYButton, ctr);
            break;
          case XRMotionComponentIds.xrStandardTouchpad:
            handleComponent(id, leftSphereTouchpad, ctr);
            break;
          default:
            console.warn(`Motion component ID (${id}) is not handled.`);
        }
      };

      const onRightHandness = (
        id: string,
        ctr: BABYLON.WebXRControllerComponent
      ) => {
        switch (id) {
          case XRMotionComponentIds.xrStandardTrigger:
            handleComponent(id, rightBoxTrigger, ctr);
            break;
          case XRMotionComponentIds.xrStandardSqueeze:
            handleComponent(id, rightBoxSqueeze, ctr);
            break;
          case XRMotionComponentIds.xrStandardThumbstick:
            handleComponent(id, rightBoxThumbstick, ctr);
            break;
          case XRMotionComponentIds.aButton:
            handleComponent(id, rightSphereAButton, ctr);
            break;
          case XRMotionComponentIds.bButton:
            handleComponent(id, rightSphereBButton, ctr);
            break;
          case XRMotionComponentIds.xrStandardTouchpad:
            handleComponent(id, rightSphereTouchpad, ctr);
            break;
          default:
            console.warn(`Motion component ID (${id}) is not handled.`);
        }
      };

      const handleComponent = (
        id: string,
        mesh: BABYLON.Mesh,
        ctr: BABYLON.WebXRControllerComponent
      ) => {
        ctr.onButtonStateChangedObservable.add(() => {
          if (ctr.pressed) {
            console.log(`Controller ${id} pressed, scaling ${mesh.name}`);
            mesh.scaling = new BABYLON.Vector3(1.2, 1.2, 1.2);
            this.dispatchAllEvents({ componentId: id });
          } else {
            mesh.scaling = new BABYLON.Vector3(1, 1, 1);
          }
        });
      };

      scene
        .createDefaultXRExperienceAsync()
        .then((xr) => {
          xr.input.onControllerAddedObservable.add((controller) => {
            controller.onMotionControllerInitObservable.add((motion) => {
              Object.values(XRMotionComponentIds).forEach((id) => {
                const component = motion.getComponent(id);
                if (component) {
                  switch (motion.handness) {
                    case 'left':
                      onLeftHandness(id, component);
                      break;
                    case 'right':
                      onRightHandness(id, component);
                      break;
                    default:
                      console.warn('Motion handness (none) not handled');
                  }
                }
              });
            });
          });
        })
        .catch(() => {});
    } catch (err) {
      console.error('Failed to load the XRSandbox panel.');
    }
  }
}

export default XRSandbox;
