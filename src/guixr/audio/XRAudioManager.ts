/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import XRAudioCatalog from './XRAudioCatalog';
import XRAudioMap from './XRAudioMap';
import XRAudioNode from './XRAudioNode';
import XRCustomCatalogBuilder from './XRCustomCatalogBuilder';
import XRSystemCatalogBuilder from './XRSystemCatalogBuilder';
import XRAudioKinds from './xr-audios/types';

class XRAudioManager {
  public static instance: XRAudioManager | null = null;
  private xrAudioSystemCatalog: XRAudioCatalog;
  private xrAudioCustomCatalog: XRAudioCatalog;
  private xrAudioMap: XRAudioMap;

  private constructor() {
    this.xrAudioSystemCatalog = XRSystemCatalogBuilder.build();
    this.xrAudioCustomCatalog = XRCustomCatalogBuilder.build();
    this.xrAudioMap = new XRAudioMap();

    XRSystemCatalogBuilder.build();
  }

  public static getInstance(): XRAudioManager {
    if (XRAudioManager.instance === null) {
      XRAudioManager.instance = new XRAudioManager();
    }

    return XRAudioManager.instance;
  }

  public playEventAudio(eventType: string) {
    const node = this.xrAudioMap.getNode(eventType);

    if (node?.isEnabled()) {
      const key = node.getAudioKey();
      const customAudio = this.xrAudioCustomCatalog.getFromCatalog(key);
      const systemAudio = this.xrAudioSystemCatalog.getFromCatalog(key);

      if (customAudio) {
        customAudio.play();
      } else if (systemAudio) {
        systemAudio.play();
      }
    }
  }

  public enrolEvent(eventType: string, audioKey?: string) {
    const key = audioKey ?? XRAudioKinds.xrEasyAudio1;
    this.xrAudioMap.setNode(eventType, new XRAudioNode(eventType, key));
  }

  public enrolEvents(eventTypes: string[]) {
    eventTypes.forEach((eventType) => {
      this.enrolEvent(eventType);
    });
  }
}

export default XRAudioManager;
