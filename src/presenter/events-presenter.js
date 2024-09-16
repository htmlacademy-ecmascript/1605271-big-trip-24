import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventsItemView from '../view/events-item-view.js';
import NoEventsView from '../view/no-events-view.js';
import {BLANK_EVENT} from '../const.js';
import {render, replace} from '../framework/render.js';

export default class BoardPresenter {
  #eventsListComponent = new EventsListView();
  #eventsContainer = null;
  #eventsModel = null;
  #events = [];
  #destinations = [];
  #offers = [];

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

  #renderEvent(event, allDestinations, allOffers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventsItemView({
      event,
      allDestinations,
      allOffers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const eventEditComponent = new EditEventView({
      event,
      allDestinations,
      allOffers,
      onEditClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventsListComponent.element);
  }

  #renderEvents() {
    if (this.#events.length === 0) {
      render(new NoEventsView(), this.#eventsContainer);
      return;
    }

    render(new SortView(), this.#eventsContainer);
    render(this.#eventsListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], this.#destinations, this.#offers);
    }
  }
}
