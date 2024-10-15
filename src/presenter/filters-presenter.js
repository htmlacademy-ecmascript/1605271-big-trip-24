import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #filtersModel = null;
  #eventsModel = null;

  #filtersComponent = null;

  constructor({filtersContainer, filtersModel, eventsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#filtersModel = filtersModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => ({
      type,
    }));
  }

  init() {
    const prevFilterComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters: this.filters,
      currentFilterType: this.#filtersModel.filters,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filters === filterType) {
      return;
    }

    this.#filtersModel.setFilters(UpdateType.MAJOR, filterType);
  };
}
