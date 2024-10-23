/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export const KIND = 'removed.panel.3d.text.writer';

export interface TextWriterPreferences {
  scale: string;
  'default-font': string;
  'letter-origin': string;
}

export interface TextWriterPosition {
  x: number;
  y: number;
  z: number;
}

export interface TextWriterRotation {
  x: number;
  y: number;
  z: number;
}

export interface TextWriterColors {
  diffuse: string;
  specular: string;
  ambient: string;
  emissive: string;
}

export interface TextWriterOptions {
  anchor: string;
  color: string;
  alpha: string;
  position: TextWriterPosition;
  colors: TextWriterColors;
  'font-family': string;
  'letter-height': number;
  'letter-thickness': number;
}

export interface TextWriter {
  text: string;
  name: string;
  options: TextWriterOptions;
  rotation: TextWriterRotation;
}

export interface TextWriterSpecs {
  prefs: TextWriterPreferences;
  writers: TextWriter[];
}
