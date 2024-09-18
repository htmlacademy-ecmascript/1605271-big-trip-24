import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import {render} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import {updateEvent} from '../utils/event.js';

export default class BoardPresenter {
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();
  #eventsListComponent = new EventsListView();
  #eventsContainer = null;
  #eventsModel = null;
  #events = [];
  #destinations = [];
  #offers = [];

  #eventPresenters = new Map();

  constructor({eventsContainer, eventsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = this.#eventsModel.events;
    this.#destinations = this.#eventsModel.destinations;
    this.#offers = this.#eventsModel.offers;
    this.#renderEvents();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateEvent(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#destinations, this.#offers);
  };

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#eventsContainer);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#eventsContainer);

    this.#events.forEach((event) => {
      this.#renderEvent(event, this.#destinations, this.#offers);
    });
  }

  #renderEvent(event, allDestinations, allOffers) {
    const eventPresenter = new EventPresenter({
      eventsListComponent: this.#eventsListComponent,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event, allDestinations, allOffers);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    if (this.#events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
  }
}
