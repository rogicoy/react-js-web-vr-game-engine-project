/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface ProvisionGuidAmendNote {
  incomingGuid: string | null;
  activeGuid: string | null;
  amendCount: number;
}

export interface ProvisionGuidAmendRecord {
  ship: ProvisionGuidAmendNote;
  planet: ProvisionGuidAmendNote;
  viewer: ProvisionGuidAmendNote;
  camera: ProvisionGuidAmendNote;
  sgeo: ProvisionGuidAmendNote;
  dgeo: ProvisionGuidAmendNote;
  sship: ProvisionGuidAmendNote;
  dship: ProvisionGuidAmendNote;
  amendIndices: number[];
}
