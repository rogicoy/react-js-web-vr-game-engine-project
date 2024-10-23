/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ProvisionGuidAmendRecord } from '../types';
import {
  PROVISION_CODE_CHECKPOINT4,
  PROVISION_CODE_INVALID
} from './constants';

const ProvisionCheckpoint4 = (() => {
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
        camera.amendCount === 1 &&
        sship.amendCount === 1 &&
        dship.amendCount === 1 &&
        planet.amendCount === 0 &&
        sgeo.amendCount === 0 &&
        dgeo.amendCount === 0 &&
        amendIndices.length === 3 &&
        amendIndices[0] === 2 &&
        amendIndices[1] === 3 &&
        amendIndices[2] === 4
        ? PROVISION_CODE_CHECKPOINT4
        : PROVISION_CODE_INVALID;
    }
  };
})();

export default ProvisionCheckpoint4;
