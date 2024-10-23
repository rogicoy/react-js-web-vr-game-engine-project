/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { XRAudio } from './types';

class XRAudioCatalog {
  private catalog: Map<string, XRAudio>;
  private kind: string;

  public constructor(kind: string) {
    this.catalog = new Map();
    this.kind = kind;
  }

  public getKind(): string {
    return this.kind;
  }

  public getCatalog(): Map<string, XRAudio> {
    return this.catalog;
  }

  public getFromCatalog(key: string): XRAudio | null {
    return this.catalog.get(key) ?? null;
  }

  public addToCatalog(key: string, xrAudio: XRAudio) {
    this.catalog.set(key, xrAudio);
  }

  public remoteFromCatalog(key: string) {
    this.catalog.delete(key);
  }
}

export default XRAudioCatalog;
