import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import EventsItemView from '../view/events-item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  eventsListComponent = new EventsListView();
  eventsContainer;
  eventsModel;
  events;

  constructor({eventsContainer, eventsModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = this.eventsModel.getEvents();
    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new EditPointView(), this.eventsListComponent.getElement());
    for (let i = 0; i < this.events.length; i++) {
      render(new EventsItemView({
        event: this.events[i],
        destination: this.eventsModel.getDestinationById(this.events[i].destination),
        offersByType: this.eventsModel.getOffersByType(this.events[i].type),
      }),
      this.eventsListComponent.getElement());
    }
  }
}
