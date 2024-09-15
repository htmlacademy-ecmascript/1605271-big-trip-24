import {filters} from '../utils/filters.js';

function generateFilter() {
  return Object.entries(filters).map(
    ([filterType]) => ({
      type: filterType,
    }),
  );
}

export {generateFilter};
