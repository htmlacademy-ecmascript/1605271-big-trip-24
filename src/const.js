const INPUT_DATE_FORMAT = 'DD/MM/YY HH:mm';
const BLANK_EVENT = {
  type: 'flight',
  destination: null,
  dateFrom: '',
  dateTo: '',
  basePrice: 0,
  offers: [],
  isFavorite: false,
};
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
const SortType = {
  DAY: {
    type: 'day',
    isDisabled: false,
  },
  EVENT: {
    type: 'event',
    isDisabled: true,
  },
  TIME: {
    type: 'time',
    isDisabled: false,
  },
  PRICE: {
    type: 'price',
    isDisabled: false,
  },
  OFFERS: {
    type: 'offers',
    isDisabled: true,
  },
};
const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {INPUT_DATE_FORMAT, BLANK_EVENT, FilterType, SortType, UserAction, UpdateType};
