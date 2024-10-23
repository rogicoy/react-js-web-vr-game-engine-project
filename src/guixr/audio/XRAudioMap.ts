/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import XRAudioNode from './XRAudioNode';

class XRAudioMap {
  private map: Map<string, XRAudioNode>;

  public constructor() {
    this.map = new Map();
  }

  public getNode(eventType: string): XRAudioNode | null {
    return this.map.get(eventType) ?? null;
  }

  public setNode(eventType: string, node: XRAudioNode) {
    this.map.set(eventType, node);
  }

  public removeNode(eventType: string) {
    this.map.delete(eventType);
  }
}

export default XRAudioMap;
