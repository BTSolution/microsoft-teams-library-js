import { sendMessageToParent } from '../internal/communication';
import { ensureInitialized } from '../internal/internalAPIs';
import { FrameContexts } from './constants';
import { SdkError } from './interfaces';
import { runtime } from './runtime';

/**
 * @alpha
 */
export namespace monetization {
  /**
   * @hidden
   * Hide from docs
   * Data structure to represent a subscription plan.
   *
   * @internal
   */
  export interface PlanInfo {
    /**
     * @hidden
     * plan id
     */
    planId: string;
    /**
     * @hidden
     * term of the plan
     */
    term: string;
  }

  /**
   * @hidden
   * Hide from docs
   * Open dialog to start user's purchase experience
   *
   * @param callback Callback contains 1 parameters, error.
   * @param planInfo optional parameter. It contains info of the subscription plan pushed to users.
   * error can either contain an error of type SdkError, incase of an error, or null when get is successful
   *
   * @internal
   */
  export function openPurchaseExperience(callback: (error: SdkError | null) => void, planInfo?: PlanInfo): void {
    if (!callback) {
      throw new Error('[open purchase experience] Callback cannot be null');
    }
    ensureInitialized(FrameContexts.content);
    sendMessageToParent('monetization.openPurchaseExperience', [planInfo], callback);
  }

  export function isSupported(): boolean {
    return runtime.supports.monetization ? true : false;
  }
}
