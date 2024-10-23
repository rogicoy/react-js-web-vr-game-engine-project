/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { EventCallback } from 'guixr/event/types';
import { PanelReferenceBundle, PanelReferenceData } from '../types';

export const BASE_URL = 'https://removed';
export const KIND = 'removed.panel.plugin.js';

export interface PluginSpecs {
  pluginVersion: string;
  pluginGuid: string;
  templateType: string;
  templateVersion: string;
}

export interface PluginContainerHelper {
  getReferenceBundle: () => PanelReferenceBundle;
  getReferenceData: () => PanelReferenceData;
  dispatchEventByIndex: (index: number, payload?: any) => void;
  dispatchAllEvents: (payload?: any) => void;
}

export interface PluginModule {
  exec: (
    helper: PluginContainerHelper,
    libs: any
  ) => {
    ingress: EventCallback;
  };
}

export type OnStorePluginSuccess = (
  guid: string,
  pluginFunc: PluginModule
) => void;

export type OnStorePluginError = (guid: string) => void;
