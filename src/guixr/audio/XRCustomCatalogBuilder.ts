/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import XRAudioCatalog from './XRAudioCatalog';

export const KIND = 'xr.audio.custom.catalog.kind';

const XRCustomCatalogBuilder = {
  build: (): XRAudioCatalog => {
    const catalog = new XRAudioCatalog(KIND);
    return catalog;
  }
};

export default XRCustomCatalogBuilder;
