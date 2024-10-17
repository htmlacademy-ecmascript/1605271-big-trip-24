import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {INPUT_DATE_FORMAT, BLANK_EVENT} from '../const.js';
import { capitalizeFirstLetter, humanizeEventDueDate, getOffersByType, getDestinationById, getDestinationByName, extractEventOfferId} from '../utils/event.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

function createEventTypesTemplate(allOffers, eventType, isDisabled) {
  const eventTypes = allOffers.map((offer) => offer.type);

  return(
    `
      ${eventTypes.map((type) => {
      const lowercaseType = type.toLowerCase();

      return (
        `
        <div class="event__type-item">
          <input
            id="event-type-${lowercaseType}-1"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            value="${lowercaseType}"
            ${eventType === lowercaseType ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}
          >
          <label
            class="event__type-label event__type-label--${lowercaseType}"
            for="event-type-${lowercaseType}-1"
          >
          ${capitalizeFirstLetter(type)}
          </label>
        </div>
        `
      );
    }).join('')}
    `
  );
}

function createOffersTemplate(offersByType, eventOffers, isDisabled) {
  if (offersByType.length === 0) {
    return '';
  }

  return (
    `
      <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersByType.map((offer) => (
      `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${offer.id}-1"
            type="checkbox"
            name="event-offer-${offer.title.toLowerCase().replace(/\s+/g, '-')}"
            ${eventOffers.includes(offer.id) ? 'checked' : '' }
            ${isDisabled ? 'disabled' : ''}
          >
          <label
            class="event__offer-label"
            for="event-offer-${offer.id}-1"
          >
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
    )).join('')}
        </div>
      </section>
    `
  );
}

function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }
  if (destination.name.length === 0) {
    return '';
  }

  const {pictures, description} = destination;

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${
    pictures.length > 0
      ? `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
              </div>
            </div>`
      : ''
    }
    </section>`
  );
}

function createOptionsTemplate(destinations) {
  return (
    `
        ${destinations.map((destination) => (
      `
        <option value="${destination.name}"></option>
      `
    )).join('')}
    `
  );
}

function createEditEventTemplate(event, allDestinations, allOffers, isCreate) {
  const {type, destination, offers, basePrice, dateFrom, dateTo, isDisabled, isSaving, isDeleting} = event;

  const fullDestination = (destination === null) ? BLANK_EVENT.destination : getDestinationById(allDestinations, destination);
  const offersByType = getOffersByType(allOffers, type);
  const typesTemplate = createEventTypesTemplate(allOffers, type, isDisabled);
  const offersTemplate = createOffersTemplate(offersByType, offers, isDisabled);
  const destinationTemplate = createDestinationTemplate(fullDestination);
  const optionsTemplate = createOptionsTemplate(allDestinations);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${!fullDestination ? '' : he.encode(fullDestination.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${optionsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${he.encode(humanizeEventDueDate(dateFrom, INPUT_DATE_FORMAT))}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${he.encode(humanizeEventDueDate(dateTo, INPUT_DATE_FORMAT))}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${isCreate ? 'Cancel' : `${isDeleting ? 'Deleting...' : 'Delete'}`}
          </button>
          ${
    isCreate
      ? ''
      : `
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Toggle event</span>
          </button>
        `
    }
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class EditEventView extends AbstractStatefulView {
  #allDestinations = [];
  #allOffers = [];
  #isCreate = false;
  #handleCloseFormClick = null;
  #handleDeleteClick = null;
  #handleFormSubmit = null;
  #fromDatepicker = null;
  #toDatepicker = null;

  constructor({event, allDestinations, allOffers, onCloseFormClick, onDeleteClick, onFormSubmit}) {
    super();
    this._setState(EditEventView.parseEventToState(event));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#isCreate = !this._state.id;

    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditEventTemplate(this._state, this.#allDestinations, this.#allOffers, this.#isCreate);
  }

  removeElement() {
    super.removeElement();

    if (this.#fromDatepicker) {
      this.#fromDatepicker.destroy();
      this.#fromDatepicker = null;
    }

    if (this.#toDatepicker) {
      this.#toDatepicker.destroy();
      this.#toDatepicker = null;
    }
  }

  reset(event) {
    this.updateElement(
      EditEventView.parseEventToState(event),
    );
  }

  _restoreHandlers() {
    const toggleButton = this.element.querySelector('.event__rollup-btn');
    const availableOffers = this.element.querySelector('.event__available-offers');

    if (toggleButton) {
      toggleButton.addEventListener('click', this.#editClickHandler);
    }
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    if (availableOffers) {
      availableOffers.addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepicker();
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick(evt);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditEventView.parseStateToEvent(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const destinationByName = getDestinationByName(this.#allDestinations, evt.target.value);

    if (destinationByName) {
      this.updateElement({
        destination: destinationByName.id,
      });
    }
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const offerId = extractEventOfferId(evt.target.id);
    const offers = this._state.offers;

    let updatedOffers;

    if (offers.includes(offerId)) {
      updatedOffers = offers.filter((id) => id !== offerId);
    } else {
      updatedOffers = [...offers, offerId];
    }

    this._setState({
      offers: updatedOffers,
    });
  };


  #setDatepicker() {
    this.#fromDatepicker = flatpickr(
      this.element.querySelector('.event__input--time[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: (selectedDates) => {
          this.#dateFromChangeHandler(selectedDates);
          this.#toDatepicker.set('minDate', selectedDates[0]);
        },
      },
    );
    this.#toDatepicker = flatpickr(
      this.element.querySelector('.event__input--time[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
