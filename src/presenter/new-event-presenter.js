import {remove, render, RenderPosition} from '../framework/render.js';
import EditEventView from '../view/edit-event-view.js';
import {UserAction, UpdateType, BLANK_EVENT} from '../const.js';

export default class NewEventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventEditComponent = null;
  #event = BLANK_EVENT;

  constructor({eventsListContainer, onDataChange, onDestroy}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(allDestinations, allOffers) {
    if (this.#eventEditComponent) {
      return;
    }

    this.#eventEditComponent = this.#createEventEditComponent(allDestinations, allOffers);
    this.#renderEventEditComponent();

    this.#addEscKeyHandler();
  }

  destroy() {
    if (!this.#eventEditComponent) {
      return;
    }

    this.#handleDestroy();
    this.#removeEventEditComponent();
    this.#removeEscKeyHandler();
  }

  setSaving() {
    this.#updateEventEditComponentState({ isDisabled: true, isSaving: true });
  }

  setAborting() {
    const resetFormState = () => {
      this.#updateEventEditComponentState({ isDisabled: false, isSaving: false, isDeleting: false });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  #createEventEditComponent(allDestinations, allOffers) {
    return new EditEventView({
      event: this.#event,
      allDestinations,
      allOffers,
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
    });
  }

  #renderEventEditComponent() {
    render(this.#eventEditComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
  }

  #removeEventEditComponent() {
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
  }

  #updateEventEditComponentState(state) {
    this.#eventEditComponent.updateElement(state);
  }

  #addEscKeyHandler() {
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #removeEscKeyHandler() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(UserAction.ADD_EVENT, UpdateType.MINOR, event);
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
