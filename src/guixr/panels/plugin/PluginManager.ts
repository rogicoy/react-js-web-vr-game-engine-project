/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-readonly */
import { PanelEnvelopeFull1 } from 'guixr/models/panel';
import {
  KIND,
  BASE_URL,
  OnStorePluginError,
  OnStorePluginSuccess,
  PluginModule,
  PluginSpecs
} from './types';
import { ShipFull2 } from 'guixr/models/ship';
import { PlanetFull2 } from 'guixr/models/planet';

class PluginManager {
  private static instance: PluginManager | null = null;

  private plugins: Map<string, PluginModule>;

  private constructor() {
    this.plugins = new Map();
  }

  public static getInstance() {
    if (PluginManager.instance == null) {
      PluginManager.instance = new PluginManager();
    }

    return PluginManager.instance;
  }

  private pluginCheck(obj: any): obj is PluginModule {
    return 'exec' in obj;
  }

  private fetchPlugin(
    guid: string,
    url: string,
    onSuccess?: OnStorePluginSuccess,
    onError?: OnStorePluginError
  ) {
    console.log('Fetching plugin:', url);

    const onTextLoad = (text: string) => {
      const module = { exports: {} };
      eval(text);
      const plugin = module.exports as PluginModule;

      if (!this.pluginCheck(plugin)) {
        console.error('Invalid plugin module', url);
        onError?.(guid);
      } else {
        this.plugins.set(guid, plugin);
        onSuccess?.(guid, plugin);
      }
    };

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response
            .text()
            .then(onTextLoad)
            .catch(() => {
              console.error('Failed to read the plugin content.');
              onError?.(guid);
            });
        }
      })
      .catch(() => {
        console.error('Failed to fetch the plugin.');
        onError?.(guid);
      });
  }

  public storePlugin(
    panelEnv: PanelEnvelopeFull1,
    onSuccess?: OnStorePluginSuccess,
    onError?: OnStorePluginError
  ) {
    const { guid } = panelEnv;
    const { specs, kind } = panelEnv.data.object;

    try {
      if (kind === KIND && !this.getPlugin(guid)) {
        const { pluginGuid, pluginVersion, templateType, templateVersion } =
          specs as PluginSpecs;

        const useTemplateType = templateType ?? 'js';
        const useTemplateVersion = templateVersion ?? 'v1';
        const usePluginVersion = pluginVersion ?? 'latest';

        this.fetchPlugin(
          guid,
          BASE_URL +
            useTemplateType +
            '/' +
            useTemplateVersion +
            '/' +
            pluginGuid +
            '.' +
            usePluginVersion +
            '.' +
            templateType,
          onSuccess,
          onError
        );
      }
    } catch (err) {
      console.error('Failed to load the plugin to manager.', err);
    }
  }

  public storePlugins(
    payload: ShipFull2 | PlanetFull2,
    onSuccess?: OnStorePluginSuccess,
    onError?: OnStorePluginError
  ) {
    payload.data.object.panels.forEach((panel) =>
      this.storePlugin(panel, onSuccess, onError)
    );
  }

  public getPlugin(key: string): PluginModule | null {
    return this.plugins.get(key) ?? null;
  }

  public removePlugin(key: string): boolean {
    return this.plugins.delete(key);
  }

  public removeAll() {
    this.plugins.clear();
  }
}

export default PluginManager;
