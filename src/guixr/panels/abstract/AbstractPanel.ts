/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import EventManager from 'guixr/event/EventManager';
import { EventEgress, EventIngress } from 'guixr/models/event';
import { Panel, PanelReferenceBundle, PanelReferenceData } from '../types';

abstract class AbstractPanel implements Panel {
  protected refBundle: PanelReferenceBundle;
  protected refData: PanelReferenceData;

  public constructor(
    refBundle: PanelReferenceBundle,
    refData: PanelReferenceData
  ) {
    this.refBundle = refBundle;
    this.refData = refData;
  }

  public abstract build(): void;

  public destroy() {
    const eventMgr = EventManager.getInstance();
    eventMgr.deleteEventPipeByKey(this.getKey());
  }

  public getReferenceBundle() {
    return this.refBundle;
  }

  public getReferenceData() {
    return this.refData;
  }

  public dispatchEventByIndex(index: number, payload?: any) {
    try {
      const eventPipeKey = this.getKey();
      const eventEgress = this.getEventEgress();
      const eventMgr = EventManager.getInstance();
      const eventPipe = eventMgr.getEventPipeByKey(eventPipeKey);

      if (eventPipe) {
        const event = eventEgress[index];
        eventPipe.dispatchEvent({
          ...event,
          source: eventPipeKey,
          type: event.type,
          args: { ...event.args, ...payload }
        });
      }
    } catch (err) {
      console.error('Failed to dispatch the event.', err);
    }
  }

  public dispatchAllEvents(payload?: any) {
    const eventEgressCount = this.getEventEgress().length;
    for (let index = 0; index < eventEgressCount; index++) {
      this.dispatchEventByIndex(index, payload);
    }
  }

  public getKey() {
    return this.refData.envelope.guid;
  }

  public getEventEgress(): EventEgress {
    return this.refData.envelope.data.object.eventEgress;
  }

  public getEventIngress(): EventIngress {
    return this.refData.envelope.data.object.eventIngress;
  }
}

export default AbstractPanel;
