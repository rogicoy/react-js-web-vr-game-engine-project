/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { LifecycleStageExitPolicyTerm } from '../sentinel/types';
import AbstractLifecycleNotifier from './abstract/AbstractLifecycleNotifier';
import { LifecycleNotifierKind } from './types';

class PorvisionLifecycleNotifier extends AbstractLifecycleNotifier {
  public constructor() {
    super(LifecycleNotifierKind.provision);
  }

  /**
   * Creates a new policy term or returns the default term.
   * @param defaultTerm
   * @param data
   * @returns
   */
  protected makeTerm(
    defaultTerm: LifecycleStageExitPolicyTerm,
    data?: any
  ): LifecycleStageExitPolicyTerm {
    // Just return the default right away.
    return defaultTerm;
  }
}

export default PorvisionLifecycleNotifier;
