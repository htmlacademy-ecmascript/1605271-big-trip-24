import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

function createSortItemTemplate(sortType) {
  return (
    `<div class="trip-sort__item trip-sort__item--${sortType.type}">
        <input
        id="sort-${sortType.type}"
        class="trip-sort__input visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${sortType.type}"
        ${sortType.isChecked ? 'checked' : ''}
        ${sortType.isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortType.type}" data-sort-type="${sortType.type}">${sortType.type}</label>
    </div>`
  );
}

function createSortTemplate() {
  const sortItemsTemplate = Object.values(SortType)
    .map((type) => createSortItemTemplate(type))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
