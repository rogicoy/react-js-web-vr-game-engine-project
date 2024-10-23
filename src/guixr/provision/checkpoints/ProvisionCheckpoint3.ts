/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ProvisionGuidAmendRecord } from '../types';
import {
  PROVISION_CODE_CHECKPOINT3,
  PROVISION_CODE_INVALID
} from './constants';

const ProvisionCheckpoint3 = (() => {
  return {
    check: (record: ProvisionGuidAmendRecord): string => {
      const {
        ship,
        viewer,
        camera,
        sship,
        dship,
        planet,
        sgeo,
        dgeo,
        amendIndices
      } = record;

      return ship.amendCount === 1 &&
        viewer.amendCount === 1 &&
        camera.amendCount === 0 &&
        sship.amendCount === 0 &&
        dship.amendCount === 0 &&
        planet.amendCount === 0 &&
        sgeo.amendCount === 0 &&
        dgeo.amendCount === 0 &&
        amendIndices.length === 1 &&
        amendIndices[0] === 1
        ? PROVISION_CODE_CHECKPOINT3
        : PROVISION_CODE_INVALID;
    }
  };
})();

export default ProvisionCheckpoint3;
