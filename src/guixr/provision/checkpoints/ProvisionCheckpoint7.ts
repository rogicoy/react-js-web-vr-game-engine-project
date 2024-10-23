/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ProvisionGuidAmendRecord } from '../types';
import {
  PROVISION_CODE_CHECKPOINT7,
  PROVISION_CODE_INVALID
} from './constants';

const ProvisionCheckpoint7 = (() => {
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
        planet.amendCount > 1 &&
        sgeo.amendCount > 0 &&
        dgeo.amendCount > 0 &&
        amendIndices.length === 1 &&
        amendIndices[0] === 5
        ? PROVISION_CODE_CHECKPOINT7
        : PROVISION_CODE_INVALID;
    }
  };
})();

export default ProvisionCheckpoint7;