import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #events = [];
  #destinations = [];
  #offers = [];
  failedOnLoad = false;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const [events, destinations, offers] = await Promise.all([
        this.#eventsApiService.events,
        this.#eventsApiService.destinations,
        this.#eventsApiService.offers,
      ]);

      this.#events = events.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;

    } catch (err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateType.FAILED);
      this.failedOnLoad = true;
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update) {
    const index = this.#findEventIndex(update.id);

    if (index === -1) {
      throw new Error('Can\'t update a non-existing event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);

      this.#events[index] = updatedEvent;
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);

      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#findEventIndex(update.id);

    if (index === -1) {
      throw new Error('Can\'t delete a non-existing event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = this.#events.filter((event) => event.id !== update.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  #findEventIndex(id) {
    return this.#events.findIndex((event) => event.id === id);
  }

  #adaptToClient(event) {
    const {
      base_price: basePrice,
      date_from: dateFrom,
      date_to: dateTo,
      is_favorite: isFavorite,
      ...restEvent
    } = event;

    return {
      ...restEvent,
      basePrice,
      dateFrom: dateFrom ? new Date(dateFrom) : null,
      dateTo: dateTo ? new Date(dateTo) : null,
      isFavorite,
    };
  }
}
