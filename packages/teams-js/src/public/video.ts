import { sendMessageToParent } from '../internal/communication';
import { registerHandler } from '../internal/handlers';
import { ensureInitialized } from '../internal/internalAPIs';
import { errorNotSupportedOnPlatform, FrameContexts } from './constants';
import { runtime } from './runtime';

/**
 * Namespace to video extensibility of the SDK
 */
export namespace video {
  /**
   * Represents a video frame
   */
  export interface VideoFrame {
    /**
     * Video frame width
     */
    width: number;
    /**
     * Video frame height
     */
    height: number;
    /**
     * Video frame buffer
     */
    data: Uint8ClampedArray;
    /**
     * NV12 luma stride, valid only when video frame format is NV12
     */
    lumaStride?: number;
    /**
     * NV12 chroma stride, valid only when video frame format is NV12
     */
    chromaStride?: number;
    /**
     * RGB stride, valid only when video frame format is RGB
     */
    stride?: number;
  }

  /**
   * Video frame format enum, currently only support NV12
   */
  export enum VideoFrameFormat {
    NV12,
  }

  /**
   * Video frame configuration supplied to Teams to customize the generated video frame parameters, like format
   */
  export interface VideoFrameConfig {
    /**
     * video format
     */
    format: VideoFrameFormat;
  }

  /**
   *  Video effect change type enum
   */
  export enum EffectChangeType {
    /**
     * current video effect changed
     */
    EffectChanged,
    /**
     * disable the video effect
     */
    EffectDisabled,
  }

  /**
   *  Video frame call back function definition
   */
  export type VideoFrameCallback = (
    frame: VideoFrame,
    notifyVideoFrameProcessed: () => void,
    notifyError: (errorMessage: string) => void,
  ) => void;

  /**
   *  Video effect change call back function definition
   */
  export type VideoEffectCallBack = (effectId: string | undefined) => void;

  /**
   * Register to read the video frames in Permissions section
   */
  export function registerForVideoFrame(frameCallback: VideoFrameCallback, config: VideoFrameConfig): void {
    ensureInitialized(FrameContexts.sidePanel);
    if (!isSupported()) {
      throw errorNotSupportedOnPlatform;
    }

    registerHandler('video.newVideoFrame', (videoFrame: VideoFrame) => {
      if (videoFrame !== undefined) {
        frameCallback(videoFrame, notifyVideoFrameProcessed, notifyError);
      }
    });
    sendMessageToParent('video.registerForVideoFrame', [config]);
  }

  /**
   * video extension should call this to notify Teams Client current selected effect parameter changed.
   * If it's pre-meeting, Teams client will call videoEffectCallback immediately then use the videoEffect.
   * in-meeting scenario, we will call videoEffectCallback when apply button clicked.
   *
   * @param effectChangeType - the effect change type.
   * @param effectId - Newly selected effect id.
   */
  export function notifySelectedVideoEffectChanged(
    effectChangeType: EffectChangeType,
    effectId: string | undefined,
  ): void {
    ensureInitialized(FrameContexts.sidePanel);
    if (!isSupported()) {
      throw errorNotSupportedOnPlatform;
    }
    sendMessageToParent('video.videoEffectChanged', [effectChangeType, effectId]);
  }

  /**
   * Register the video effect callback, Teams client uses this to notify the video extension the new video effect will by applied
   */
  export function registerForVideoEffect(callback: VideoEffectCallBack): void {
    ensureInitialized(FrameContexts.sidePanel);
    if (!isSupported()) {
      throw errorNotSupportedOnPlatform;
    }
    registerHandler('video.effectParameterChange', callback);
  }

  /**
   * Sending notification to Teams client finished the video frame processing, now Teams client can render this video frame
   * or pass the video frame to next one in video pipeline
   */
  function notifyVideoFrameProcessed(): void {
    sendMessageToParent('video.videoFrameProcessed');
  }

  /**
   * Sending error notification to Teams client
   */
  function notifyError(errorMessage: string): void {
    sendMessageToParent('video.notifyError', [errorMessage]);
  }

  export function isSupported(): boolean {
    return runtime.supports.video ? true : false;
  }
} //end of video namespace
