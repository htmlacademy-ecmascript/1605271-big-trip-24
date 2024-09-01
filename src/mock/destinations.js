const mockDestinations = [
  {
    id: 1,
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    pictures: [],
  },
  {
    id: 2,
    name: 'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures: [`https://loremflickr.com/248/152?random=${Math.random()}`],
  },
  {
    id: 3,
    name: 'Chamonix',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    pictures: [`https://loremflickr.com/248/152?random=${Math.random()}`, `https://loremflickr.com/248/152?random=${Math.random()}`],
  },
];

export {mockDestinations};
