/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ProvisionGuidAmendRecord } from '../types';
import {
  PROVISION_CODE_CHECKPOINT2,
  PROVISION_CODE_INVALID
} from './constants';

const ProvisionCheckpoint2 = (() => {
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
        viewer.amendCount === 0 &&
        camera.amendCount === 0 &&
        sship.amendCount === 0 &&
        dship.amendCount === 0 &&
        planet.amendCount === 0 &&
        sgeo.amendCount === 0 &&
        dgeo.amendCount === 0 &&
        amendIndices.length === 1 &&
        amendIndices[0] === 0
        ? PROVISION_CODE_CHECKPOINT2
        : PROVISION_CODE_INVALID;
    }
  };
})();

export default ProvisionCheckpoint2;
