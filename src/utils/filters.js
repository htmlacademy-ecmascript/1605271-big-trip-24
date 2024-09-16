import {FilterType} from '../const';
import {isPointFuture, isPointPresent, isPointPast} from './event';

const filters = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isPointFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPointPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isPointPast(event.dateTo)),
};

export {filters};
