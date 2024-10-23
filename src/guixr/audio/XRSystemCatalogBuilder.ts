/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import XRAudioCatalog from './XRAudioCatalog';
import XREasyAudio1 from './xr-audios/XREasyAudio1';
import XREasyAudio2 from './xr-audios/XREasyAudio2';

export const KIND = 'xr.audio.system.catalog.kind';

const XRSystemCatalogBuilder = {
  build: (): XRAudioCatalog => {
    const catalog = new XRAudioCatalog(KIND);

    const xrEasyAudio1 = new XREasyAudio1();
    const xrEasyAudio2 = new XREasyAudio2();

    catalog.addToCatalog(xrEasyAudio1.getKind(), xrEasyAudio1);
    catalog.addToCatalog(xrEasyAudio2.getKind(), xrEasyAudio2);

    return catalog;
  }
};

export default XRSystemCatalogBuilder;
