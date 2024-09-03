const mockOffers = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 50,
      },
      {
        id: 2,
        title: 'Switch to comfort',
        price: 80,
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 5,
      },
      {
        id: 2,
        title: 'Add meal',
        price: 15,
      }
    ],
  },
];

function getOffers() {
  return mockOffers;
}

export {getOffers};
