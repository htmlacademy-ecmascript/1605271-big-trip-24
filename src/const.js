const INPUT_DATE_FORMAT = 'DD/MM/YY HH:mm';
const BLANK_EVENT = {
  type: 'flight',
  destination: {
    name: '',
  },
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

export {INPUT_DATE_FORMAT, BLANK_EVENT, FilterType, SortType};
