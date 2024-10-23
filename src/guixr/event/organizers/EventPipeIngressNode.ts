/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */

/**
 * Node component of EventPipeIngressTree.
 */
class EventPipeIngressNode {
  // Node key.
  private key: string;

  // Children nodes.
  private children: Map<string, EventPipeIngressNode>;

  // Keys to get the ingress callbacks from EventPipeIngressCatalog.
  private callbackKeys: string[];

  public constructor(
    key: string,
    children?: Map<string, EventPipeIngressNode>,
    callbackKeys?: string[]
  ) {
    this.key = key;
    this.children = children ?? new Map();
    this.callbackKeys = callbackKeys ?? [];
  }

  /**
   * Returns the node key.
   * @returns
   */
  public getKey(): string {
    return this.key;
  }

  /**
   * Returns the children nodes.
   * @returns
   */
  public getChildren(): Map<string, EventPipeIngressNode> {
    return this.children;
  }

  /**
   * Returns the ingress callback keys.
   * @returns
   */
  public getCallbackKeys(): string[] {
    return this.callbackKeys;
  }

  /**
   * Sets the nodes as children.
   * @param children
   */
  public setChildren(children: Map<string, EventPipeIngressNode>) {
    this.children = children;
  }

  /**
   * Adds the nodes to existing children.
   * @param children
   */
  public addChildren(children: Map<string, EventPipeIngressNode>) {
    this.children = { ...this.children, ...children };
  }

  /**
   * Adds the node to exisiting children.
   * @param child
   */
  public addChild(child: EventPipeIngressNode) {
    this.children.set(child.getKey(), child);
  }

  /**
   * Sets the ingress callback keys.
   * @param keys
   */
  public setCallbackKeys(keys: string[]) {
    this.callbackKeys = keys;
  }

  /**
   * Adds the ingress callback keys to the existing keys.
   * @param keys
   */
  public addCallbackKeys(keys: string[]) {
    this.callbackKeys = [...this.callbackKeys, ...keys];
  }

  /**
   * Adds the ingress callback key to the existing keys.
   * @param key
   */
  public addCallbackKey(key: string) {
    this.callbackKeys.push(key);
  }
}

export default EventPipeIngressNode;
