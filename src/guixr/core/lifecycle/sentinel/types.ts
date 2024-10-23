/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { LifecycleNotifierKind } from '../notifiers/types';

/**
 * Removed's lifecycle stages.
 */
export enum LifecycleStage {
  inactive = 'removed',
  starting = 'removed',
  active = 'removed',
  activeArrived = 'removed',
  activeDeparting = 'removed',
  stopping = 'removed'
}

/**
 * An Exit Policy Term is a combination of lifecycle values that determines the
 * end of a lifecycle stage.
 */
export interface LifecycleStageExitPolicyTerm {
  notifier: LifecycleNotifierKind;
  value1?: string;
  value2?: string;
  value3?: string;
}

/**
 * An Exit Policy holds the information of the policy term and next lifecycle stage.
 */
export interface LifecycleStageExitPolicy extends LifecycleStageExitPolicyTerm {
  target: LifecycleStage;
}
