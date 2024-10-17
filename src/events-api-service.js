import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const Endpoints = {
  EVENTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._fetchData(Endpoints.EVENTS);
  }

  get destinations() {
    return this._fetchData(Endpoints.DESTINATIONS);
  }

  get offers() {
    return this._fetchData(Endpoints.OFFERS);
  }

  async updateEvent(event) {
    return this._sendData(`${Endpoints.EVENTS}/${event.id}`, Method.PUT, event);
  }

  async addEvent(event) {
    return this._sendData(Endpoints.EVENTS, Method.POST, event);
  }

  async deleteEvent(event) {
    return this._load({
      url: `${Endpoints.EVENTS}/${event.id}`,
      method: Method.DELETE,
    });
  }

  _fetchData(url) {
    return this._load({ url })
      .then(ApiService.parseResponse);
  }

  async _sendData(url, method, event) {
    const response = await this._load({
      url,
      method,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return ApiService.parseResponse(response);
  }

  #adaptToServer(event) {
    const { basePrice, dateFrom, dateTo, isFavorite, ...rest } = event;

    return {
      ...rest,
      'base_price': basePrice,
      'date_from': dateFrom instanceof Date ? dateFrom.toISOString() : null,
      'date_to': dateTo instanceof Date ? dateTo.toISOString() : null,
      'is_favorite': isFavorite,
    };
  }
}
