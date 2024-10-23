/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// If you need to initialize singletons from guixr, add it here.
import { LifecycleObserversController } from './core/lifecycle';
import CoreEngine from './core/CoreEngine';
import SceneManager from './core/SceneManager';
import XRAudioManager from './audio/XRAudioManager';
import EventManager from './event/EventManager';
import PluginManager from './panels/plugin/PluginManager';

export const initGuixr = () => {
  LifecycleObserversController.getInstance();
  CoreEngine.getInstance();
  SceneManager.getInstance();
  EventManager.getInstance();
  PluginManager.getInstance();
  XRAudioManager.getInstance();
};
