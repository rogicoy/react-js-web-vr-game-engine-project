/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable @typescript-eslint/prefer-readonly */
import { EventEgress, EventIngress } from 'guixr/models/event';
import EventPipeEgressHandler from './utilities/EventPipeEgressHandler';
import EventPipeIngressCatalog from './organizers/EventPipeIngressCatalog';
import EventPipeIngressHandler from './utilities/EventPipeIngressHandler';
import EventPipeIngressTree from './organizers/EventPipeIngressTree';
import EventHookHandler from './utilities/EventHookHandler';
import { ResponseEventPayload, EventPipeableComponent } from './types';

class EventPipe {
  private component: EventPipeableComponent;
  private epiHandler: EventPipeIngressHandler;
  private epeHandler: EventPipeEgressHandler;

  public constructor(
    component: EventPipeableComponent,
    epiCatalog: EventPipeIngressCatalog,
    epiTree: EventPipeIngressTree,
    eventHookHandler: EventHookHandler
  ) {
    this.component = component;

    this.epiHandler = new EventPipeIngressHandler(
      component.getKey(),
      component.getEventIngress(),
      epiCatalog,
      epiTree
    );

    this.epeHandler = new EventPipeEgressHandler(
      component.getKey(),
      epiCatalog,
      epiTree,
      eventHookHandler
    );
  }

  public dispatchEvent(event: ResponseEventPayload) {
    this.epeHandler.getCallback()(event);
  }

  public getEventPipeKey(): string {
    return this.component.getKey();
  }

  public getEventEgress(): EventEgress {
    return this.component.getEventEgress();
  }

  public getEventIngress(): EventIngress {
    return this.component.getEventIngress();
  }

  public getEventPipeIngressHandler(): EventPipeIngressHandler {
    return this.epiHandler;
  }

  public getEventPipeEgressHandler(): EventPipeEgressHandler {
    return this.epeHandler;
  }
}

export default EventPipe;
