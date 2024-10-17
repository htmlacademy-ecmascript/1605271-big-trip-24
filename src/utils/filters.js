import { FilterType } from '../const';
import { isPointFuture, isPointPresent, isPointPast } from './event';

const filtersVariants = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter(({ dateFrom }) => isPointFuture(dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter(({ dateFrom, dateTo }) => isPointPresent(dateFrom, dateTo)),
  [FilterType.PAST]: (events) => events.filter(({ dateTo }) => isPointPast(dateTo)),
};

export { filtersVariants };
