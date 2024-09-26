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
    isChecked: true,
    isDisabled: false,
  },
  EVENT: {
    type: 'event',
    isChecked: false,
    isDisabled: true,
  },
  TIME: {
    type: 'time',
    isChecked: false,
    isDisabled: false,
  },
  PRICE: {
    type: 'price',
    isChecked: false,
    isDisabled: false,
  },
  OFFERS: {
    type: 'offers',
    isChecked: false,
    isDisabled: true,
  },
};

export {INPUT_DATE_FORMAT, BLANK_EVENT, FilterType, SortType};
