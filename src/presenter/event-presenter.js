import {render, replace, remove} from '../framework/render.js';
import EditEventView from '../view/edit-event-view.js';
import EventsItemView from '../view/events-item-view.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #handleDataChange = null;
  #handleModeChange = null;

  #eventsListComponent = null;
  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({eventsListComponent, onDataChange, onModeChange}) {
    this.#eventsListComponent = eventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event, allDestinations, allOffers) {
    this.#event = event;
    this.#destinations = allDestinations;
    this.#offers = allOffers;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = this.#createEventComponent();
    this.#eventEditComponent = this.#createEventEditComponent();

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListComponent.element);
      return;
    }

    this.#replaceComponents(prevEventComponent, prevEventEditComponent);
    this.#removePreviousComponents(prevEventComponent, prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#resetForm();
      this.#replaceFormToEvent();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
    } else {
      this.#eventEditComponent.shake(resetFormState);
    }
  }

  #createEventComponent() {
    return new EventsItemView({
      event: this.#event,
      allDestinations: this.#destinations,
      allOffers: this.#offers,
      onOpenFormClick: this.#replaceEventToForm,
      onFavoriteClick: this.#handleFavoriteClick,
    });
  }

  #createEventEditComponent() {
    return new EditEventView({
      event: this.#event,
      allDestinations: this.#destinations,
      allOffers: this.#offers,
      onCloseFormClick: () => {
        this.#resetForm();
        this.#replaceFormToEvent();
      },
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
    });
  }

  #replaceComponents(prevEventComponent, prevEventEditComponent) {
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }
  }

  #removePreviousComponents(prevEventComponent, prevEventEditComponent) {
    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #resetForm() {
    this.#eventEditComponent.reset(this.#event);
  }

  #replaceEventToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetForm();
      this.#replaceFormToEvent();
    }
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#event, isFavorite: !this.#event.isFavorite}
    );
  };
}
