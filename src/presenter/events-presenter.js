import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import EventsItemView from '../view/events-item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  eventsListComponent = new EventsListView();
  eventsContainer;

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new EditPointView(), this.eventsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventsItemView(), this.eventsListComponent.getElement());
    }
  }
}
