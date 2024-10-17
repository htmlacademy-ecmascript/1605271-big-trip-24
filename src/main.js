import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import {render, RenderPosition} from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import FiltersModel from './model/filters-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic 6215cb2eac13d94c';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FiltersModel();

const eventsPresenter = new EventsPresenter({
  eventsContainer,
  eventsModel,
  filtersModel,
  onNewEventDestroy: handleNewEventFormClose
});
const filtersPresenter = new FiltersPresenter({
  filtersContainer,
  filtersModel,
  eventsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  eventsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

function initApplication() {
  render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
  filtersPresenter.init();
  eventsPresenter.init();
  eventsModel.init().finally(() => {
    render(newEventButtonComponent, tripInfoContainer);
  });
}

initApplication();
