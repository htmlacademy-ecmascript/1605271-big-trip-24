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

export {INPUT_DATE_FORMAT, BLANK_EVENT};
