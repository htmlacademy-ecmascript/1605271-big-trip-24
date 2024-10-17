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
    this.#renderFilters();
  }

  #renderFilters() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters: this.filters,
      currentFilterType: this.#filtersModel.filters,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
    } else {
      replace(this.#filtersComponent, prevFiltersComponent);
      remove(prevFiltersComponent);
    }
  }

  #handleModelEvent = () => {
    this.#renderFilters();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filters !== filterType) {
      this.#filtersModel.setFilters(UpdateType.MAJOR, filterType);
    }
  };
}
