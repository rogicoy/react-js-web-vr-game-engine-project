/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ProvisionGuidAmendRecord } from '../types';
import {
  PROVISION_CODE_CHECKPOINT8,
  PROVISION_CODE_INVALID
} from './constants';

const ProvisionCheckpoint8 = (() => {
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
        sgeo.amendCount > 1 &&
        dgeo.amendCount > 1 &&
        amendIndices.length === 2 &&
        amendIndices[0] === 6 &&
        amendIndices[1] === 7
        ? PROVISION_CODE_CHECKPOINT8
        : PROVISION_CODE_INVALID;
    }
  };
})();

export default ProvisionCheckpoint8;
