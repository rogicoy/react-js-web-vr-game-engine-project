/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

 
import { WORKER_KIND as viewerWorker } from 'guixr/core/workers/prime/ViewerWorker';
import { WORKER_KIND as shipWorker } from 'guixr/core/workers/prime/ShipWorker';
import { WORKER_KIND as planetWorker } from 'guixr/core/workers/prime/PlanetWorker';
import { WORKER_KIND as sshipWorker } from 'guixr/core/workers/scene-providers/SShipWorker';
import { WORKER_KIND as dshipWorker } from 'guixr/core/workers/scene-providers/DShipWorker';
import { WORKER_KIND as sgeoWorker } from 'guixr/core/workers/scene-providers/SGeoWorker';
import { WORKER_KIND as dgeoWorker } from 'guixr/core/workers/scene-providers/DGeoWorker';
import { WORKER_KIND as cameraWorker } from 'guixr/core/workers/scene-consumers/camera/CameraWorker';
import { WORKER_KIND as panelWorker } from 'guixr/core/workers/scene-consumers/PanelWorker';
import { WORKER_KIND as photodomeWorker } from 'guixr/core/workers/scene-consumers/PhotodomeWorker';
import { WORKER_KIND as skyboxWorker } from 'guixr/core/workers/scene-consumers/SkyboxWorker';
import { WORKER_KIND as videodomeWorker } from 'guixr/core/workers/scene-consumers/VideodomeWorker';

const WorkerKinds = {
  viewerWorker,
  cameraWorker,
  shipWorker,
  planetWorker,
  sshipWorker,
  dshipWorker,
  sgeoWorker,
  dgeoWorker,
  panelWorker,
  photodomeWorker,
  skyboxWorker,
  videodomeWorker
};

export default WorkerKinds;
