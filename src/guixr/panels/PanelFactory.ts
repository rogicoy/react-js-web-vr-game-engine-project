/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import EventManager from 'guixr/event/EventManager';
import { Panel, PanelReferenceBundle, PanelReferenceData } from './types';
import PanelKinds from './kinds';
import PluginContainer from './plugin/PluginContainer';
import HoloButton3D from './3d-holo-button/HoloButton3D';
import GltfRemote from './gltf-remote/GltfRemote';
import Cylinder3D from './3d-cylinder/Cylinder3D';
import Plane3D from './3d-plane/Plane3D';
import Scatter3D from './3d-scatter/Scatter3D';
import Sphere3D from './3d-sphere/Sphere3D';
import TextWriter3D from './3d-text-writer/TextWriter3D';
import XRSandbox from './xr-sandbox/XRSandbox';
import XRExperience from './xr-experience/XRExperience';

const PanelFactory = (() => {
  const setup = (panel: Panel): Panel => {
    const eventManager = EventManager.getInstance();
    eventManager.enrolComponent(panel);
    return panel;
  };

  const create = (
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ): Panel | null => {
    const { kind } = refData.envelope.data.object;

    switch (kind) {
      case PanelKinds.plugin:
        return setup(new PluginContainer(refBundle, refData));
      case PanelKinds.holoButton3D:
        return setup(new HoloButton3D(refBundle, refData));
      case PanelKinds.cylinder3D:
        return setup(new Cylinder3D(refBundle, refData));
      case PanelKinds.plane3D:
        return setup(new Plane3D(refBundle, refData));
      case PanelKinds.scatter3D:
        return setup(new Scatter3D(refBundle, refData));
      case PanelKinds.sphere3D:
        return setup(new Sphere3D(refBundle, refData));
      case PanelKinds.textWriter3D:
        return setup(new TextWriter3D(refBundle, refData));
      case PanelKinds.remoteGlb:
      case PanelKinds.remoteGltf2:
        return setup(new GltfRemote(refBundle, refData));
      case PanelKinds.xrSandbox:
        return setup(new XRSandbox(refBundle, refData));
      case PanelKinds.xrExperience:
        return setup(new XRExperience(refBundle, refData));
      default:
        return null;
    }
  };

  return { create };
})();

export default PanelFactory;
