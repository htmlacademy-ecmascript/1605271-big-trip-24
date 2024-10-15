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
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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
        return filteredEvents.sort(sortTime);
      case SortType.PRICE.type:
        return filteredEvents.sort(sortPrice);
    }

    return filteredEvents;
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
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilters(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.destinations, this.offers);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: true});
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
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearSort();
    this.#renderSort();
    this.#clearEvents();
    this.#renderEvents();
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

  #clearNoEvents() {
    remove(this.#noEventsComponent);
  }

  #renderNoEvents() {
    this.#noEventsComponent = new NoEventsView({
      filterType: this.#filterType
    });

    render(this.#noEventsComponent, this.#eventsContainer);
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

  #clearEvents({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventsComponent) {
      this.#clearNoEvents();
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
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
}
