/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import EventPipeIngressCatalog from '../organizers/EventPipeIngressCatalog';
import EventPipeIngressTree from '../organizers/EventPipeIngressTree';
import { EventCallback } from '../types';

/**
 * Handles the event pipe ingress function.
 */
class EventPipeIngressHandler {
  private ingressKey: string;
  private ingressEventTypes: string[];
  private ingressCatalog: EventPipeIngressCatalog;
  private ingressTree: EventPipeIngressTree;

  public constructor(
    ingressKey: string,
    ingressEventTypes: string[],
    ingressCatalog: EventPipeIngressCatalog,
    ingressTree: EventPipeIngressTree
  ) {
    this.ingressKey = ingressKey;
    this.ingressEventTypes = ingressEventTypes;
    this.ingressCatalog = ingressCatalog;
    this.ingressTree = ingressTree;

    // Enrol the ingress event type to the ingress tree.
    this.ingressEventTypes.forEach((type) => {
      this.ingressTree.enrolCallback(type, this.ingressKey);
    });
  }

  /**
   * Returns the ingress key.
   * @returns
   */
  public getIngressKey(): string {
    return this.ingressKey;
  }

  /**
   * Returns the ingress event types.
   * @returns
   */
  public getIngressEventTypes(): string[] {
    return this.ingressEventTypes;
  }

  /**
   * Returns the ingress callback of this handler from the ingress callback catalog.
   * @returns
   */
  public getCallback(): EventCallback | null {
    return this.ingressCatalog.getFromCatalog(this.ingressKey);
  }

  /**
   * Sets the ingress callback of this handler to the ingress callback catalog.
   * @param callback
   */
  public setCallback(callback: EventCallback) {
    this.ingressCatalog.setToCatalog(this.ingressKey, callback);
  }

  /**
   * Removes the ingress callback of this handler from the ingress callback catalog.
   */
  public removeCallback() {
    this.ingressCatalog.removeFromCatalog(this.ingressKey);
  }
}

export default EventPipeIngressHandler;
