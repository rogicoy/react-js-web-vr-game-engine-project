/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */

import {
  LifecycleStage,
  LifecycleStageExitPolicy,
  LifecycleStageExitPolicyTerm
} from './types';

class LifecycleStageGate {
  private exitPolicies: LifecycleStageExitPolicy[];
  private stage: LifecycleStage;

  public constructor(
    stage: LifecycleStage,
    exitPolicies?: LifecycleStageExitPolicy[]
  ) {
    this.exitPolicies = exitPolicies ?? [];
    this.stage = stage;
  }

  public validateTerm(
    term: LifecycleStageExitPolicyTerm
  ): LifecycleStage | null {
    for (const policy of this.exitPolicies) {
      if (
        policy.notifier === term.notifier &&
        policy.value1 === term.value1 &&
        policy.value2 === term.value2 &&
        policy.value3 === term.value3
      ) {
        return policy.target;
      }
    }
    return null;
  }

  public getStage(): LifecycleStage {
    return this.stage;
  }
}

export default LifecycleStageGate;
