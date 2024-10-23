/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// Separator character between event type nodes.
export const EVENT_TYPE_NODE_SEPARATOR = '.';

// Key of the Event Pipe Ingress tree head node.
export const EPI_TREE_HEAD_KEY = 'epi-tree-head';

// Multi-dimensional whitelist of the system workflow event type nodes.
export const SYS_EVENT_MULTID_WHITELIST = [
  ['xr'],
  ['sys'],
  ['dispatch'],
  ['websocket']
];

// Multi-dimensional whitelist of the local event type nodes.
export const LOCAL_EVENT_MULTID_WHITELIST = [['xr'], ['local']];

// Multi-dimensional whitelist of the remote event type nodes.
export const REMOTE_EVENT_MULTID_WHITELIST = [
  // First level node.
  ['xr'],

  // Second level node.
  ['rt', 'nrt'],

  // Third level node.
  ['ship', 'planet', 'status', 'jira']
];
