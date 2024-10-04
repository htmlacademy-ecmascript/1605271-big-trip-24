import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FiltersModel extends Observable {
  #filters = FilterType.EVERYTHING;

  get filters() {
    return this.#filters;
  }

  setFilters(updateType, filters) {
    this.#filters = filters;
    this._notify(updateType, filters);
  }
}
