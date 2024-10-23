/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import ProvisionCheckpoint1 from './checkpoints/ProvisionCheckpoint1';
import ProvisionCheckpoint2 from './checkpoints/ProvisionCheckpoint2';
import ProvisionCheckpoint3 from './checkpoints/ProvisionCheckpoint3';
import ProvisionCheckpoint4 from './checkpoints/ProvisionCheckpoint4';
import ProvisionCheckpoint5 from './checkpoints/ProvisionCheckpoint5';
import ProvisionCheckpoint6 from './checkpoints/ProvisionCheckpoint6';
import ProvisionCheckpoint7 from './checkpoints/ProvisionCheckpoint7';
import ProvisionCheckpoint8 from './checkpoints/ProvisionCheckpoint8';
import { PROVISION_CODE_INVALID } from './checkpoints/constants';
import { ProvisionGuidAmendRecord } from './types';

const ProvisionChecker = (() => {
  const checkpoints = [
    ProvisionCheckpoint1,
    ProvisionCheckpoint2,
    ProvisionCheckpoint3,
    ProvisionCheckpoint4,
    ProvisionCheckpoint5,
    ProvisionCheckpoint6,
    ProvisionCheckpoint7,
    ProvisionCheckpoint8
  ];

  return {
    check: (record: ProvisionGuidAmendRecord): string => {
      for (const checkpoint of checkpoints) {
        const code = checkpoint.check(record);
        if (code !== PROVISION_CODE_INVALID) {
          return code;
        }
      }

      return PROVISION_CODE_INVALID;
    }
  };
})();

export default ProvisionChecker;
