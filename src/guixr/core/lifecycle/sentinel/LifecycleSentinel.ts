/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */

import LifecycleStageGate from './LifecycleStageGate';
import { LifecycleStage, LifecycleStageExitPolicyTerm } from './types';
import {
  STAGE_GATE_EXIT_POLICY_ACTIVE,
  STAGE_GATE_EXIT_POLICY_ACTIVE_ARRIVED,
  STAGE_GATE_EXIT_POLICY_ACTIVE_DEPARTING,
  STAGE_GATE_EXIT_POLICY_INACTIVE,
  STAGE_GATE_EXIT_POLICY_STARTING,
  STAGE_GATE_EXIT_POLICY_STOPPING
} from './policies';

class LifecycleSentinel {
  private static instance: LifecycleSentinel | null = null;

  private gates: Map<LifecycleStage, LifecycleStageGate>;

  private stage: LifecycleStage;

  private constructor() {
    this.gates = new Map();
    this.stage = LifecycleStage.inactive;

    this.gates.set(
      LifecycleStage.inactive,
      new LifecycleStageGate(
        LifecycleStage.inactive,
        STAGE_GATE_EXIT_POLICY_INACTIVE
      )
    );

    this.gates.set(
      LifecycleStage.starting,
      new LifecycleStageGate(
        LifecycleStage.starting,
        STAGE_GATE_EXIT_POLICY_STARTING
      )
    );

    this.gates.set(
      LifecycleStage.stopping,
      new LifecycleStageGate(
        LifecycleStage.stopping,
        STAGE_GATE_EXIT_POLICY_STOPPING
      )
    );

    this.gates.set(
      LifecycleStage.active,
      new LifecycleStageGate(
        LifecycleStage.active,
        STAGE_GATE_EXIT_POLICY_ACTIVE
      )
    );

    this.gates.set(
      LifecycleStage.activeArrived,
      new LifecycleStageGate(
        LifecycleStage.activeArrived,
        STAGE_GATE_EXIT_POLICY_ACTIVE_ARRIVED
      )
    );

    this.gates.set(
      LifecycleStage.activeDeparting,
      new LifecycleStageGate(
        LifecycleStage.activeDeparting,
        STAGE_GATE_EXIT_POLICY_ACTIVE_DEPARTING
      )
    );
  }

  public static getInstance(): LifecycleSentinel {
    if (LifecycleSentinel.instance === null) {
      LifecycleSentinel.instance = new LifecycleSentinel();
    }
    return LifecycleSentinel.instance;
  }

  public getStage(term: LifecycleStageExitPolicyTerm): LifecycleStage {
    const node = this.gates.get(this.stage);

    if (node) {
      const targetStage = node.validateTerm(term);

      if (targetStage) {
        this.stage = targetStage;
      }
    }

    return this.stage;
  }
}

export default LifecycleSentinel;
