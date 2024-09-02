const mockEvents = [
  {
    id: 1,
    type: 'flight',
    destination: 1,
    dateFrom: '2024-06-15T15:00:00.000Z',
    dateTo: '2024-06-15T18:00:00.000Z',
    basePrice: 1000,
    offers: [1, 2],
    isFavorite: true,
  },
  {
    id: 2,
    type: 'bus',
    destination: 2,
    dateFrom: '2024-06-15T12:00:00.000Z',
    dateTo: '2024-06-15T17:00:00.000Z',
    basePrice: 500,
    offers: [1],
    isFavorite: false,
  },
];

export {mockEvents};
