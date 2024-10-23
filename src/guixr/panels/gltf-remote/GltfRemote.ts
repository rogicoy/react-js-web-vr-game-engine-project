/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { BABYLON } from '@babylonjs/viewer';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { GltfRemoteSpecs } from './types';

class GltfRemote extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  private makeMeshTask(
    mgr: BABYLON.AssetsManager,
    specs: GltfRemoteSpecs,
    name: string
  ): BABYLON.MeshAssetTask | null {
    const { url, filename } = specs;
    const ext = filename.split('.').pop();

    switch (ext) {
      case 'gltf':
      case 'glb':
        return mgr.addMeshTask(name, '', url, filename);
      default:
        return null;
    }
  }

  public build() {
    try {
      const { assetsMgr, scene } = this.refBundle;
      const { envelope } = this.refData;
      const { specs, position, scale, rotation } = envelope.data.object;

      if (assetsMgr) {
        const meshTask = this.makeMeshTask(
          assetsMgr,
          specs,
          `${envelope.guid}-task`
        );

        if (meshTask) {
          meshTask.onSuccess = (task) => {
            if (position) {
              task.loadedMeshes[0].position = new BABYLON.Vector3(
                position.x,
                position.y,
                position.z
              );
            }

            if (scale) {
              task.loadedMeshes[0].scaling = new BABYLON.Vector3(
                scale.x,
                scale.y,
                scale.z
              );
            }

            if (rotation) {
              task.loadedMeshes[1].rotation = new BABYLON.Vector3(
                rotation.x,
                rotation.y,
                rotation.z
              );
            }

            if (scene && specs.clickable) {
              const actionManager = new BABYLON.ActionManager(scene);
              actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPickTrigger,
                  () => {
                    this.dispatchAllEvents();
                  }
                )
              );

              task.loadedMeshes.forEach((mesh) => {
                mesh.actionManager = actionManager;
              });
            }
          };
        }
      }
    } catch (err) {
      console.error('GltfRemote', err);
    }
  }
}

export default GltfRemote;
