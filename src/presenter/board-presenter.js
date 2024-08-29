import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view.js';
// import AddPointNoOffersView from '../view/add-point-no-offers-view.js';
// import AddPointNoPicturesView from '../view/add-point-no-pictures-view.js';
import EventsItemView from '../view/events-item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  eventsListComponent = new EventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.eventsListComponent, this.boardContainer);
    render(new EditPointView(), this.eventsListComponent.getElement());
    render(new AddPointView(), this.eventsListComponent.getElement());
    // render(new AddPointNoOffersView(), this.eventsListComponent.getElement());
    // render(new AddPointNoPicturesView(), this.eventsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventsItemView(), this.eventsListComponent.getElement());
    }
  }
}
