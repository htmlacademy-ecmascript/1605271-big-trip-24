import FiltersView from './view/filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import {RenderPosition, render} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: eventsContainer});

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);

eventsPresenter.init();
