/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export type EventEgress = Array<{
  type: string;
  args?: any;
  [key: string]: string;
}>;

export type EventIngress = string[];
