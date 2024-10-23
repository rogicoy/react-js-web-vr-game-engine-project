/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import XRAudioManager from 'guixr/audio/XRAudioManager';
import EventPipeIngressCatalog from './organizers/EventPipeIngressCatalog';
import EventPipeIngressTree from './organizers/EventPipeIngressTree';
import EventHookHandler from './utilities/EventHookHandler';
import SystemContextualEventRebounder from './rebounders/SystemContextualEventRebounder';
import SystemWebSocketEventDispatcher from './dispatchers/SystemWebSocketEventDispatcher';
import { EventCallback, EventPipeableComponent } from './types';
import EventPipe from './EventPipe';

class EventManager {
  private static instance: EventManager | null = null;
  private eventPipes: Map<string, EventPipe>;
  private epiCatalog: EventPipeIngressCatalog;
  private epiTree: EventPipeIngressTree;
  private eventHookHandler: EventHookHandler;
  private systemContextualEventRebounder: SystemContextualEventRebounder;
  private systemWebSocketEventDispatcher: SystemWebSocketEventDispatcher;

  private constructor() {
    // Initialize the backbone components.
    this.eventPipes = new Map();
    this.epiCatalog = new EventPipeIngressCatalog();
    this.epiTree = new EventPipeIngressTree();

    // Initialize the event hook handler.
    this.eventHookHandler = new EventHookHandler();

    // Initialize the system rebounders.
    this.systemContextualEventRebounder = new SystemContextualEventRebounder();

    // Initialize the system dispatchers.
    this.systemWebSocketEventDispatcher = new SystemWebSocketEventDispatcher();
    this.enrolComponent(this.systemWebSocketEventDispatcher);
  }

  /**
   * Returns the instance of the EventManager.
   * @returns
   */
  public static getInstance(): EventManager {
    if (EventManager.instance === null) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  /**
   * Creates an EventPipe for the given component and adds it to the EventPipe list.
   * @param component
   */
  private createEventPipe(component: EventPipeableComponent) {
    const eventPipeKey = component.getKey();
    if (!this.eventPipes.get(eventPipeKey)) {
      const pipe = new EventPipe(
        component,
        this.epiCatalog,
        this.epiTree,
        this.eventHookHandler
      );

      this.eventPipes.set(eventPipeKey, pipe);
    }
  }

  /**
   * TODO: Needs enhancements.
   * Enrols the given component to the XRAudio system.
   * @param component
   */
  private createXrAudio(component: EventPipeableComponent) {
    const xrAudioManager = XRAudioManager.getInstance();
    xrAudioManager.enrolEvents(component.getEventIngress());
  }

  /**
   * Enrols the given component to the EventPipe system and XRAudio system.
   * @param component
   */
  public enrolComponent(component: EventPipeableComponent) {
    try {
      this.createEventPipe(component);
      this.createXrAudio(component);
    } catch (err) {
      console.error('Failed to enrol component', err);
    }
  }

  /**
   * Returns the event pipes.
   * @returns
   */
  public getEventPipes(): Map<string, EventPipe> {
    return this.eventPipes;
  }

  /**
   * Returns the event pipe ingress catalog.
   * @returns
   */
  public getEventPipeIngressCatalog(): EventPipeIngressCatalog {
    console.log('EPI CATALOG', this.epiCatalog);
    return this.epiCatalog;
  }

  /**
   * Returns the event pipe ingress tree.
   * @returns
   */
  public getEventPipeIngressTree(): EventPipeIngressTree {
    return this.epiTree;
  }

  /**
   * Returns the event pipe of the given key.
   * @param key
   * @returns
   */
  public getEventPipeByKey(key: string): EventPipe | null {
    return this.eventPipes.get(key) ?? null;
  }

  /**
   * Deletes the event pipe of the given key.
   * @param key
   */
  public deleteEventPipeByKey(key: string) {
    this.eventPipes.delete(key);
  }

  /**
   * Returns the ingress callback given the key.
   * @param key
   * @returns
   */
  public getIngressCallbackByKey(key: string): EventCallback | null {
    return this.epiCatalog.getCatalog().get(key) ?? null;
  }

  /**
   * Returns the event hook handler.
   * @returns
   */
  public getEventHookHandler(): EventHookHandler {
    return this.eventHookHandler;
  }

  /**
   * Returns the SystemContextualEventRebounder instance. This should be used in Saga only.
   * @returns
   */
  public getSystemContextualEventRebounder(): SystemContextualEventRebounder {
    return this.systemContextualEventRebounder;
  }

  public getSystemWebSocketEventDispatcher(): SystemWebSocketEventDispatcher {
    return this.systemWebSocketEventDispatcher;
  }
}

export default EventManager;
