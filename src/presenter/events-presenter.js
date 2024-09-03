import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventsItemView from '../view/events-item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  eventsListComponent = new EventsListView();
  eventsContainer;
  eventsModel;
  events;
  destinations;
  offers;

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
      event: this.events[1],
      destination: this.eventsModel.getDestinationById(this.events[1].destination),
      offersByType: this.eventsModel.getOffersByType(this.events[1].type),
      allDestinations: this.destinations,
      allOffers: this.offers,
      isCreate: true
    }),
    this.eventsListComponent.getElement());
    render(new EditEventView({
      event: this.events[1],
      destination: this.eventsModel.getDestinationById(this.events[1].destination),
      offersByType: this.eventsModel.getOffersByType(this.events[1].type),
      allDestinations: this.destinations,
      allOffers: this.offers,
      isCreate: false
    }),
    this.eventsListComponent.getElement());
    this.events.forEach((event) => {
      render(new EventsItemView({
        event: event,
        destination: this.eventsModel.getDestinationById(event.destination),
        offersByType: this.eventsModel.getOffersByType(event.type),
      }),
      this.eventsListComponent.getElement());
    });
  }
}
