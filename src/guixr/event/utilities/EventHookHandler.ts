/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { EventCallback } from '../types';

/**
 * Handles the remote, pre-event and post-event hook callbacks.
 */
class EventHookHandler {
  // Callback function called on system event type.
  private systemEventHook: EventCallback;

  // Callback function called on remote event type.
  private remoteEventHook: EventCallback;

  // Callback function called on local event type.
  private localEventHook: EventCallback;

  // Callback function called before notifying the ingress callbacks subscribing
  // to the event.
  private preEventHook: EventCallback;

  // Callback function called after notifying the ingress callbacks subscribing
  // to the event.
  private postEventHook: EventCallback;

  public constructor() {
    this.systemEventHook = (event) => {};
    this.remoteEventHook = (event) => {};
    this.localEventHook = (event) => {};
    this.preEventHook = (event) => {};
    this.postEventHook = (event) => {};
  }

  /**
   * Sets the system event hook callback.
   * @param callback
   */
  public setSystemEventHook(callback: EventCallback) {
    this.systemEventHook = callback;
  }

  /**
   * Returns the system event hook callback.
   * @returns
   */
  public getSystemEventHook(): EventCallback {
    return (event) => {
      // Wrap the system event hook function for future operations needed prior
      // the actual call.
      this.systemEventHook(event);
    };
  }

  /**
   * Sets the remote event hook callback.
   * @param callback
   */
  public setRemoteEventHook(callback: EventCallback) {
    this.remoteEventHook = callback;
  }

  /**
   * Returns the remote event hook callback.
   * @returns
   */
  public getRemoteEventHook(): EventCallback {
    return (event) => {
      // Wrap the remote event hook function for future operations needed prior
      // the actual call.
      this.remoteEventHook(event);
    };
  }

  /**
   * Sets the local event hook callback.
   * @param callback
   */
  public setLocalEventHook(callback: EventCallback) {
    this.localEventHook = callback;
  }

  /**
   * Returns the local event hook callback.
   * @returns
   */
  public getLocalEventHook(): EventCallback {
    return (event) => {
      // Wrap the local event hook function for future operations needed prior
      // the actual call.
      this.localEventHook(event);
    };
  }

  /**
   * Sets the pre-event hook callback.
   * @param callback
   */
  public setPreEventHook(callback: EventCallback) {
    this.preEventHook = callback;
  }

  /**
   * Returns the pre-event hook callback.
   */
  public getPreEventHook(): EventCallback {
    return (event) => {
      // Wrap the pre-event hook function for future operations needed prior
      // the actual call.
      this.preEventHook(event);
    };
  }

  /**
   * Sets the post-event hook callback.
   * @param callback
   */
  public setPostEventHook(callback: EventCallback) {
    this.postEventHook = callback;
  }

  /**
   * Returns the post-event hook callback.
   * @returns
   */
  public getPostEventHook(): EventCallback {
    return (event) => {
      // Wrap the post-event hook function for future operations needed prior
      // the actual call.
      this.postEventHook(event);
    };
  }
}

export default EventHookHandler;
