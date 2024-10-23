/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import EventTypeContextValidator from './EventTypeContextValidator';
import EventPipeIngressCatalog from '../organizers/EventPipeIngressCatalog';
import EventPipeIngressTree from '../organizers/EventPipeIngressTree';
import EventHookHandler from './EventHookHandler';
import XRAudioManager from 'guixr/audio/XRAudioManager';
import { EventLifecycleNotifier } from 'guixr/core/lifecycle';
import { EventCallback, ResponseEventPayload } from '../types';

/**
 * Handles the event pipe egress function.
 */
class EventPipeEgressHandler {
  private egressKey: string;
  private eventHookHandler: EventHookHandler;
  private epiCatalog: EventPipeIngressCatalog;
  private epiTree: EventPipeIngressTree;

  public constructor(
    egressKey: string,
    epiCatalog: EventPipeIngressCatalog,
    epiTree: EventPipeIngressTree,
    eventHooksHandler: EventHookHandler
  ) {
    this.egressKey = egressKey;
    this.epiCatalog = epiCatalog;
    this.epiTree = epiTree;
    this.eventHookHandler = eventHooksHandler;
  }

  /**
   * Returns the egress key.
   * @returns
   */
  public getEgressKey(): string {
    return this.egressKey;
  }

  /**
   * Creates and returns the egress callback function.
   * @returns
   */
  public getCallback(): EventCallback {
    const eventLifecycleNotifier = new EventLifecycleNotifier();

    const handleLocalEvent = (event: ResponseEventPayload) => {
      if (EventTypeContextValidator.isLocalEventType(event.type)) {
        // Invoke the pre-event callback function.
        this.eventHookHandler.getPreEventHook()(event);

        // Local event goes directly to the subscribing panels.
        // Traverse to the ingress tree and invoke the ingress callback functions.
        this.epiTree.getCallbackKeysByEventType(event.type).forEach((key) => {
          this.epiCatalog.getFromCatalog(key)?.(event);
        });

        // Invoke the local event callback function.
        this.eventHookHandler.getLocalEventHook()(event);

        // Invoke the post-event callback function.
        this.eventHookHandler.getPostEventHook()(event);
      }
    };

    const handleRemoteEvent = (event: ResponseEventPayload) => {
      if (EventTypeContextValidator.isRemoteEventType(event.type)) {
        // Invoke the pre-event callback function.
        this.eventHookHandler.getPreEventHook()(event);

        // Remote event routes to the event hook. The logic on how to handle the
        // event is up to the callback function.
        this.eventHookHandler.getRemoteEventHook()(event);

        // Invoke the post-event callback function.
        this.eventHookHandler.getPostEventHook()(event);
      }
    };

    const handleSystemEvent = (event: ResponseEventPayload) => {
      if (EventTypeContextValidator.isSystemEventType(event.type)) {
        // Invoke the system event callback function.
        this.eventHookHandler.getSystemEventHook()(event);
      }
    };

    return (event) => {
      eventLifecycleNotifier.notify(event.type, event);

      const xrAudioPlaylist = XRAudioManager.getInstance();
      xrAudioPlaylist.playEventAudio(event.type);

      handleLocalEvent(event);
      handleRemoteEvent(event);
      handleSystemEvent(event);
    };
  }
}

export default EventPipeEgressHandler;
