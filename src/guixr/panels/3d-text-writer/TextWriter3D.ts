/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/no-var-requires */
import { BABYLON } from '@babylonjs/viewer';
import MeshWriter from 'meshwriter';
import AbstractPanel from '../abstract/AbstractPanel';
import { PanelReferenceBundle, PanelReferenceData } from '../types';
import { TextWriterSpecs } from './types';

class TextWriter3D extends AbstractPanel {
  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    super(refBundle, refData);
  }

  public build() {
    try {
      const { scene } = this.refBundle;
      const { envelope } = this.refData;
      const { specs } = envelope.data.object;
      const { prefs, writers } = specs as TextWriterSpecs;

      const Writer = MeshWriter(scene, { ...prefs, methods: BABYLON });
      writers.forEach((obj) => {
        const { text, options, rotation } = obj;
        const writer = new Writer(text, options);
        writer.getMesh().rotation = new BABYLON.Vector3(
          rotation.x,
          rotation.y,
          rotation.z
        );
      });
    } catch (err) {
      console.error('TextWriter3D', err);
    }
  }
}

export default TextWriter3D;
