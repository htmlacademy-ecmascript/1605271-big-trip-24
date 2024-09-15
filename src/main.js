import FiltersView from './view/filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import {render, RenderPosition} from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import {generateFilter} from './mock/filters.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter({eventsContainer: eventsContainer, eventsModel});
const filters = generateFilter();

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), filtersContainer);

eventsPresenter.init();
