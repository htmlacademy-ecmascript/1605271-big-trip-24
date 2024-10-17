import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import {render, remove} from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import {sortPrice, sortTime} from '../utils/event.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filtersVariants} from '../utils/filters.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #filtersModel = null;

  #sortComponent = null;
  #noEventsComponent = null;
  #eventsListComponent = new EventsListView();
  #loadingComponent = new LoadingView();

  #newEventPresenter = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY.type;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit);

  constructor({eventsContainer, eventsModel, filtersModel, onNewEventDestroy}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filtersModel = filtersModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filtersModel.filters;
    const events = this.#eventsModel.events;
    const filteredEvents = filtersVariants[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.TIME.type:
        return filteredEvents.slice().sort(sortTime);
      case SortType.PRICE.type:
        return filteredEvents.slice().sort(sortPrice);
      default:
        return filteredEvents;
    }
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  init() {
    this.#renderEvents();
  }

  createEvent() {
    this.#resetFilterAndSort();
    this.#newEventPresenter.init(this.destinations, this.offers);
  }

  #resetFilterAndSort() {
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilters(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    try {
      switch (actionType) {
        case UserAction.UPDATE_EVENT:
          await this.#updateEvent(updateType, update);
          break;
        case UserAction.ADD_EVENT:
          await this.#addEvent(updateType, update);
          break;
        case UserAction.DELETE_EVENT:
          await this.#deleteEvent(updateType, update);
          break;
      }
    } catch (err) {
      this.#handleActionError(actionType, update.id);
    }

    this.#uiBlocker.unblock();
  };

  async #updateEvent(updateType, update) {
    this.#eventPresenters.get(update.id).setSaving();
    await this.#eventsModel.updateEvent(updateType, update);
  }

  async #addEvent(updateType, update) {
    this.#newEventPresenter.setSaving();
    await this.#eventsModel.addEvent(updateType, update);
  }

  async #deleteEvent(updateType, update) {
    this.#eventPresenters.get(update.id).setDeleting();
    await this.#eventsModel.deleteEvent(updateType, update);
  }

  #handleActionError(actionType, eventId) {
    if (actionType === UserAction.ADD_EVENT) {
      this.#newEventPresenter.setAborting();
    } else {
      this.#eventPresenters.get(eventId).setAborting();
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: updateType === UpdateType.MAJOR});
        this.#renderEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEvents();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#clearSort();
      this.#clearEvents();
      this.#renderEvents();
    }
  };

  #clearSort() {
    remove(this.#sortComponent);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderNoEvents() {
    this.#noEventsComponent = new NoEventsView({filterType: this.#filterType});
    render(this.#noEventsComponent, this.#eventsContainer);
  }

  #clearEvents({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    this.#clearSort();
    this.#clearComponents();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #clearComponents() {
    remove(this.#loadingComponent);
    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
  }

  #renderEvents() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventsListComponent, this.#eventsContainer);

    this.events.forEach((event) => {
      this.#renderEvent(event, this.destinations, this.offers);
    });
  }

  #renderEvent(event, allDestinations, allOffers) {
    const eventPresenter = new EventPresenter({
      eventsListComponent: this.#eventsListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event, allDestinations, allOffers);
    this.#eventPresenters.set(event.id, eventPresenter);
  }
}
