/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import EventPipeIngressNode from './EventPipeIngressNode';
import { EPI_TREE_HEAD_KEY, EVENT_TYPE_NODE_SEPARATOR } from './constants';

/**
 * Holds all ingress callback references in a tree structure.
 */
class EventPipeIngressTree {
  private head: EventPipeIngressNode;

  public constructor() {
    this.head = new EventPipeIngressNode(EPI_TREE_HEAD_KEY);
  }

  /**
   * Returns the head of the reference tree.
   * @returns
   */
  public getHead(): EventPipeIngressNode {
    return this.head;
  }

  /**
   * Enrols the given callback key against the given event type to the reference tree.
   * @param eventType
   * @param callbackKey
   */
  public enrolCallback(eventType: string, callbackKey: string) {
    const nodeKeys = eventType.split(EVENT_TYPE_NODE_SEPARATOR);
    let pointer = this.head;

    nodeKeys.forEach((nodeKey, index, array) => {
      let node = pointer.getChildren().get(nodeKey);

      if (!node) {
        node = new EventPipeIngressNode(nodeKey);
        pointer.getChildren().set(nodeKey, node);
      }

      if (index < array.length - 1) {
        pointer = node;
      } else {
        node.addCallbackKey(callbackKey);
      }
    });
  }

  /**
   * Returns the ingress callback keys given the event type.
   * @param eventType
   * @returns
   */
  public getCallbackKeysByEventType(eventType: string): string[] {
    const nodeKeys = eventType.split(EVENT_TYPE_NODE_SEPARATOR);
    let pointer = this.head;

    for (let ctr = 0; ctr < nodeKeys.length; ctr++) {
      const node = pointer.getChildren().get(nodeKeys[ctr]);

      if (node) {
        if (ctr < nodeKeys.length - 1) {
          pointer = node;
        } else {
          return node.getCallbackKeys();
        }
      }
    }

    return [];
  }
}

export default EventPipeIngressTree;
