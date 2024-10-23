/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { XRAudio } from '../types';

export const KIND = 'xr.audio.easy.sample.1';

class XRFancyAudio implements XRAudio {
  public play() {
    console.log('PLAYING XR FANCY AUDIO');
  }

  public stop() {
    console.log('STOPPING XR FANCY AUDIO');
  }

  public getKind(): string {
    return KIND;
  }
}

export default XRFancyAudio;
