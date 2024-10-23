/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { EventEgress, EventIngress } from './event';

export interface PanelRaw {
  apiVersion: string;
  kind: string;
  inputs: any;
  specs: any;
  enabled?: boolean;
  eventEgress: EventEgress;
  eventIngress: EventIngress;
}

export interface PanelRawData {
  object: PanelRaw;
}

export interface PanelFull1 {
  name: string;
  guid: string;
  data: PanelRawData;
}

export interface PanelFull2 extends PanelFull1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}

export interface PanelEnvelopePosition {
  x: number;
  y: number;
  z: number;
}

export interface PanelEnvelopeScale {
  x: number;
  y: number;
  z: number;
}

export interface PanelEnvelopeRotation {
  x: number;
  y: number;
  z: number;
}

export interface PanelEnvelopeRaw extends PanelRaw {
  name: string;
  guid: string;
  position: PanelEnvelopePosition;
  scale: PanelEnvelopeScale;
  rotation: PanelEnvelopeRotation;
}

export interface PanelEnvelopeRawData {
  object: PanelEnvelopeRaw;
}

export interface PanelEnvelopeFull1 {
  name: string;
  guid: string;
  data: PanelEnvelopeRawData;
}

export interface PanelEnvelopeFull2 extends PanelEnvelopeFull1 {
  _id: string;
  token_username: string;
  token_sub: string;
  created_utc: string;
  updated_utc: string;
}
