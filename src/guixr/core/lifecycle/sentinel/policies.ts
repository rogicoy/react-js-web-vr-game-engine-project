/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import {
  LifecycleEngineStatus,
  LifecycleNotifierKind
} from '../notifiers/types';
import { LifecycleStage, LifecycleStageExitPolicy } from './types';

/**
 * Exit policy for the Inactive stage.
 */
export const STAGE_GATE_EXIT_POLICY_INACTIVE: LifecycleStageExitPolicy[] = [
  {
    target: LifecycleStage.starting,
    notifier: LifecycleNotifierKind.engine,
    value1: LifecycleEngineStatus.initializing
  }
];

/**
 * Exit policy for the Starting stage.
 */
export const STAGE_GATE_EXIT_POLICY_STARTING: LifecycleStageExitPolicy[] = [
  {
    target: LifecycleStage.active,
    notifier: LifecycleNotifierKind.engine,
    value1: LifecycleEngineStatus.active
  }
];

/**
 * Exit policy for the Active stage.
 */
export const STAGE_GATE_EXIT_POLICY_ACTIVE: LifecycleStageExitPolicy[] = [
  {
    target: LifecycleStage.activeDeparting,
    notifier: LifecycleNotifierKind.event,
    value1: 'removed'
  },
  {
    target: LifecycleStage.stopping,
    notifier: LifecycleNotifierKind.engine,
    value1: LifecycleEngineStatus.stopping
  }
];

/**
 * Exit policy for the Active-arrived stage.
 */
export const STAGE_GATE_EXIT_POLICY_ACTIVE_ARRIVED: LifecycleStageExitPolicy[] =
  [
    {
      target: LifecycleStage.activeDeparting,
      notifier: LifecycleNotifierKind.event,
      value1: 'removed'
    },
    {
      target: LifecycleStage.stopping,
      notifier: LifecycleNotifierKind.engine,
      value1: LifecycleEngineStatus.stopping
    }
  ];

/**
 * Exit policy for the Active-departing stage.
 */
export const STAGE_GATE_EXIT_POLICY_ACTIVE_DEPARTING: LifecycleStageExitPolicy[] =
  [
    {
      target: LifecycleStage.activeArrived,
      notifier: LifecycleNotifierKind.event,
      value1: 'removed',
      value2: 'removed'
    }
  ];

/**
 * Exit policy for the Stopping stage.
 */
export const STAGE_GATE_EXIT_POLICY_STOPPING: LifecycleStageExitPolicy[] = [
  {
    target: LifecycleStage.inactive,
    notifier: LifecycleNotifierKind.engine,
    value1: LifecycleEngineStatus.inactive
  }
];
