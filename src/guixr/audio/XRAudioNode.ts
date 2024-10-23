/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
class XRAudioNode {
  private eventType: string;
  private audioKey: string;
  private enabled: boolean;

  public constructor(eventType: string, audioKey: string) {
    this.eventType = eventType;
    this.audioKey = audioKey;
    this.enabled = true;
  }

  public getEventType(): string {
    return this.eventType;
  }

  public getAudioKey(): string {
    return this.audioKey;
  }

  public setAudioKey(key: string) {
    this.audioKey = key;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }
}

export default XRAudioNode;
