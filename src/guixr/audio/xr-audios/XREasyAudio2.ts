/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/


/* eslint-disable @typescript-eslint/prefer-readonly */
import * as Tone from 'tone';
import { XRAudio } from '../types';

export const KIND = 'xr.audio.easy.sample.2';

class XREasyAudio2 implements XRAudio {
  public play() {
    console.log('PLAYING XR EASY AUDIO 2');
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease('G4', '8n');
  }

  public stop() {
    console.log('STOPPING XR EASY AUDIO 1');
  }

  public getKind(): string {
    return KIND;
  }
}

export default XREasyAudio2;
