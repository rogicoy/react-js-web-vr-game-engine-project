/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import libs from './libs';
import EventManager from 'guixr/event/EventManager';
import PluginManager from './PluginManager';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { PluginContainerHelper, PluginModule } from './types';

class PluginContainer extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  private makeHelper(): PluginContainerHelper {
    return {
      getReferenceBundle: (): PanelReferenceBundle => this.getReferenceBundle(),
      getReferenceData: (): PanelReferenceData => this.getReferenceData(),
      dispatchAllEvents: (payload?: any) => this.dispatchAllEvents(payload),
      dispatchEventByIndex: (index: number, payload?: any) =>
        this.dispatchEventByIndex(index, payload)
    };
  }

  private loadPlugin(plugin: PluginModule) {
    try {
      const { envelope } = this.refData;
      const eventMgr = EventManager.getInstance();
      const pipe = eventMgr.getEventPipeByKey(envelope.guid);
      const { ingress } = plugin.exec(this.makeHelper(), libs);
      pipe?.getEventPipeIngressHandler().setCallback(ingress);
    } catch (err) {
      console.error('Invalid plugin format.', err);
    }
  }

  public build() {
    const { envelope } = this.refData;
    const pluginMgr = PluginManager.getInstance();
    const existingModule = pluginMgr.getPlugin(envelope.guid);

    if (existingModule) {
      this.loadPlugin(existingModule);
    } else {
      pluginMgr.storePlugin(
        envelope,
        (guid: string, createdModule: PluginModule) => {
          this.loadPlugin(createdModule);
        }
      );
    }
  }

  public destroy(): void {
    const pluginMgr = PluginManager.getInstance();
    pluginMgr.removePlugin(this.getKey());
    super.destroy();
  }
}

export default PluginContainer;
