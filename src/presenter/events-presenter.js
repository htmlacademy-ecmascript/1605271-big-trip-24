import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import {render} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import {updateEvent, sortPrice, sortTime} from '../utils/event.js';
import {SortType} from '../const.js';

export default class BoardPresenter {
  #sortComponent = null;
  #noEventsComponent = new NoEventsView();
  #eventsListComponent = new EventsListView();
  #eventsContainer = null;
  #eventsModel = null;
  #events = [];
  #destinations = [];
  #offers = [];

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedEventItems = [];

  constructor({eventsContainer, eventsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];
    this.#sourcedEventItems = [...this.#eventsModel.events];
    this.#renderEvents();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateEvent(this.#events, updatedEvent);
    this.#sourcedEventItems = updateEvent(this.#sourcedEventItems, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#destinations, this.#offers);
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#events.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortPrice);
        break;
      default:
        this.#events = [...this.#sourcedEventItems];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

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
