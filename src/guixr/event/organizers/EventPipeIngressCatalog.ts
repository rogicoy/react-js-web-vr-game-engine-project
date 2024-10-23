/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { EventCallback } from '../types';

/**
 * Holds all event pipe ingresses.
 */
class EventPipeIngressCatalog {
  private catalog: Map<string, EventCallback>;

  public constructor() {
    this.catalog = new Map();
  }

  /**
   * Returns a map of all the event pipe ingress callbacks.
   * @returns
   */
  public getCatalog() {
    return this.catalog;
  }

  /**
   * Sets the ingress callback to catalog with the given key.
   * @param key
   * @param callback
   */
  public setToCatalog(key: string, callback: EventCallback) {
    this.catalog.set(key, callback);
    console.log('setToCatalog', this.catalog);
  }

  /**
   * Removes the ingress callback of the given key from catalog.
   * @param key
   */
  public removeFromCatalog(key: string) {
    this.catalog.delete(key);
  }

  /**
   * Gets the ingress callback of the given key from catalog.
   * @param key
   * @returns
   */
  public getFromCatalog(key: string): EventCallback | null {
    console.log('getFromCatalog', this.catalog);
    return this.catalog.get(key) ?? null;
  }
}

export default EventPipeIngressCatalog;
