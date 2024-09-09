import { getDestinations } from '../mock/destinations.js';
import { getEvents } from '../mock/events.js';
import { getOffers } from '../mock/offers.js';

export default class EventsModel {
  events = getEvents();
  destinations = getDestinations();
  offers = getOffers();

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
