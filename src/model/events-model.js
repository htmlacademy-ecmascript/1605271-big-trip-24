import { getDestinations } from '../mock/destinations.js';
import { getEvents } from '../mock/events.js';
import { getOffers } from '../mock/offers.js';

export default class EventsModel {
  #events = getEvents();
  #destinations = getDestinations();
  #offers = getOffers();

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
