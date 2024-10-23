/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { ShipState } from './models';

export const rootState: Selector<any, ShipState> = (state: any) => state.ship;

const selectors = {
  rootState
};

export default selectors;
