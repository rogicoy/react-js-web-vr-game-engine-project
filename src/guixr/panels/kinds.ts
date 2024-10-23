/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { KIND as plugin } from './plugin/types';
import { KIND as holoButton3D } from './3d-holo-button/types';
import { KIND as cylinder3D } from './3d-cylinder/types';
import { KIND as plane3D } from './3d-plane/types';
import { KIND as scatter3D } from './3d-scatter/types';
import { KIND as sphere3D } from './3d-sphere/types';
import { KIND as textWriter3D } from './3d-text-writer/types';
import { KIND as xrSandbox } from './xr-sandbox/types';
import { KIND as xrExperience } from './xr-experience/types';
import {
  KIND_GLB as remoteGlb,
  KIND_GLTF2 as remoteGltf2
} from './gltf-remote/types';

const PanelKinds = {
  plugin,
  holoButton3D,
  cylinder3D,
  plane3D,
  scatter3D,
  sphere3D,
  textWriter3D,
  remoteGlb,
  remoteGltf2,
  xrSandbox,
  xrExperience
};

export default PanelKinds;
