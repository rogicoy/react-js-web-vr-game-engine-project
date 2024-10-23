/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';

/**
 *
 * The class adds input support for mouse and touch events to camera. The class equally
 * ensures the FreeCamera behaviour is the same on desktop and phone devices
 * @see https://removed
 * for a deeper dive
 */
class FreeCameraPointersInput extends BABYLON.BaseCameraPointersInput {
  public camera!: BABYLON.FreeCamera;
  public angularSensibility = 2000.0;

  // Touch-based variables
  public singleFingerRotate: boolean = false;
  public touchMoveSensibility: number = 250.0;
  public touchAngularSensibility: number = 200000.0;
  public touchEnabled: boolean = true;

  private _offsetX: BABYLON.Nullable<number> = null;
  private _offsetY: BABYLON.Nullable<number> = null;
  private _previousPositionX: BABYLON.Nullable<number> = null;
  private _previousPositionY: BABYLON.Nullable<number> = null;
  private _touches: number = 0;

  public getClassName(): string {
    return 'FreeCameraPointersInput';
  }

  /**
   * checkInputs
   *
   * This will be execued on every frame(each time an input event occurs) We're using it here
   * to update the camera position/rotation
   */
  public checkInputs(): void {
    if (this.touchEnabled || this._offsetX === null || this._offsetY === null) {
      return;
    }

    if (this._offsetX === 0 && this._offsetY === 0) {
      return;
    }

    const camera = this.camera;
    camera.cameraRotation.y = this._offsetX / this.touchAngularSensibility;

    if (this.acceptTouchInput()) {
      camera.cameraRotation.x = -this._offsetY / this.touchAngularSensibility;
    } else {
      this.moveCameraAlongCurrentMatrix();
    }
  }

  /**
   * onTouch
   *
   * This function is required.  This will handle all logic related to a single touch.
   * This is called during a POINTERMOVE event.
   */
  public onTouch(
    point: BABYLON.Nullable<BABYLON.PointerTouch>,
    offsetX: number,
    offsetY: number
  ): void {
    const directionAdjust = this.getCameraDirection();

    this.camera.cameraRotation.y +=
      (directionAdjust * offsetX) / this.angularSensibility;

    if (this.getInputType(point) === 'pointer') {
      this.camera.cameraRotation.x += offsetY / this.angularSensibility;
    } else if (this.getCameraActivity() === 'inactive') {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      this._offsetX = Number(point?.x) - this.validate(this._previousPositionX);
      this._offsetY = -(
        Number(point?.y) - this.validate(this._previousPositionY)
      );
    }
  }

  /**
   * onMultiTouch
   *
   * This function is required.  This will handle all logic when there are multiple active touches.
   * This is called during a POINTERMOVE event.
   *
   * pointA and B should never be null if this is called, unless you are manually calling this.
   *
   * The distances should also always have a value.
   *
   * The pan positions (which could be renamed as long as the data types are the same) may be
   * null at the beginning or the end of a movement.
   */
  public onMultiTouch(
    pointA: BABYLON.Nullable<BABYLON.PointerTouch>,
    pointB: BABYLON.Nullable<BABYLON.PointerTouch>,
    previousPinchSquaredDistance: number,
    pinchSquaredDistance: number,
    previousMultiTouchPanPosition: BABYLON.Nullable<BABYLON.PointerTouch>,
    multiTouchPanPosition: BABYLON.Nullable<BABYLON.PointerTouch>
  ): void {
    if (!this.touchEnabled && multiTouchPanPosition) {
      this._offsetX = multiTouchPanPosition.x - Number(this._previousPositionX);
      this._offsetY = -(
        multiTouchPanPosition.y - Number(this._previousPositionY)
      );
    }
  }

  /**
   * onButtonDown
   *
   * This function will trigger when a touch or button is pressed down.
   */
  public onButtonDown(evt: BABYLON.IPointerEvent): void {
    if (evt.pointerType === 'touch' && !this.touchEnabled) {
      this._previousPositionX = evt.clientX;
      this._previousPositionY = evt.clientY;
      this._touches++;
    }
  }

  /**
   * onButtonUp
   *
   * This function will trigger when a touch or button is pressed up.
   */
  public onButtonUp(evt: BABYLON.IPointerEvent): void {
    if (evt.pointerType === 'touch' && !this.touchEnabled) {
      this._previousPositionX = null;
      this._previousPositionY = null;
      this._offsetX = null;
      this._offsetY = null;
      this._touches -= this._touches > 0 ? 1 : 0;
    }
  }

  /**
   * moveCameraAlongCurrentMatrix
   *
   * This function moves the camera in specific direction based on it's speed,
   * sensitivity(touchMoveSensibility), and the current matrix the camera is runing
   * in.
   */
  private moveCameraAlongCurrentMatrix() {
    const camera = this.camera;
    const offsetY = this.validate(this._offsetY);

    const speed = camera._computeLocalCameraSpeed();
    const direction = new BABYLON.Vector3(
      0,
      0,
      this.touchMoveSensibility !== 0
        ? (speed * offsetY) / this.touchMoveSensibility
        : 0
    );

    BABYLON.Matrix.RotationYawPitchRollToRef(
      camera.rotation.y,
      camera.rotation.x,
      0,
      camera._cameraRotationMatrix
    );
    camera.cameraDirection.addInPlace(
      BABYLON.Vector3.TransformCoordinates(
        direction,
        camera._cameraRotationMatrix
      )
    );
  }

  /**
   * getInputType
   *
   * This will determines the type of input device that generated the provided event
   */
  private getInputType(event: BABYLON.Nullable<BABYLON.PointerTouch>) {
    const evntType = event?.type;

    const isPointer =
      evntType === 'mouse' || (evntType === 'touch' && this.touchEnabled);

    return isPointer ? 'pointer' : 'N/A';
  }

  /**
   * acceptTouchInput
   *
   * This function verifies weather the camera accepts finger gestures
   */
  private acceptTouchInput(): boolean {
    return (
      (this.singleFingerRotate && this._touches === 1) ||
      (!this.singleFingerRotate && this._touches > 1)
    );
  }

  /**
   * getCameraActivity
   *
   * This function will give you the status of the previous camera movement
   */
  private getCameraActivity() {
    const isInactive =
      this._previousPositionX === null || this._previousPositionY === null;

    return isInactive ? 'inactive' : 'active';
  }

  /**
   * getCameraDirection
   *
   * This function determine the orientation of the camera, it's either
   * left to right or right to left
   */
  private getCameraDirection() {
    let direction = 1;

    if (this.camera.getScene().useRightHandedSystem) {
      direction *= -1;
    }

    if (
      this.camera.parent &&
      this.camera.parent._getWorldMatrixDeterminant() < 0
    ) {
      direction *= -1;
    }

    return direction;
  }

  /**
   * validate
   *
   * This makes the value argument non-nullable
   */
  private validate<T>(value?: T) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return value!;
  }
}

export default FreeCameraPointersInput;
