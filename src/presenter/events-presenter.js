import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventsItemView from '../view/events-item-view.js';
import { BLANK_EVENT } from '../const.js';
import {render} from '../render.js';

export default class BoardPresenter {
  eventsListComponent = new EventsListView();
  eventsContainer = null;
  eventsModel = null;
  events = [];
  destinations = [];
  offers = [];

  constructor({eventsContainer, eventsModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = this.eventsModel.getEvents();
    this.destinations = this.eventsModel.getDestinations();
    this.offers = this.eventsModel.getOffers();
    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new EditEventView({
      event: BLANK_EVENT,
      allDestinations: this.destinations,
      allOffers: this.offers
    }),
    this.eventsListComponent.getElement());
    render(new EditEventView({
      event: this.events[0],
      allDestinations: this.destinations,
      allOffers: this.offers
    }),
    this.eventsListComponent.getElement());
    for (let i = 1; i < this.events.length; i++) {
      render(new EventsItemView({
        event: this.events[i],
        allDestinations: this.destinations,
        allOffers: this.offers
      }),
      this.eventsListComponent.getElement());
    }
  }
}
