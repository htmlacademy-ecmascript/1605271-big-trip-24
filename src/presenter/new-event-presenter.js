import {remove, render, RenderPosition} from '../framework/render.js';
import EditEventView from '../view/edit-event-view.js';
import {UserAction, UpdateType, BLANK_EVENT} from '../const.js';

export default class NewEventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #event = BLANK_EVENT;

  #eventEditComponent = null;

  constructor({eventsListContainer, onDataChange, onDestroy}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(allDestinations, allOffers) {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EditEventView({
      event: this.#event,
      allDestinations: allDestinations,
      allOffers: allOffers,
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#eventEditComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      {id: Math.floor(Math.random() * (100 - 5 + 1) + 2), ...task},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
