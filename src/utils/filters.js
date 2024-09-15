import {FilterType} from '../const';
import {isTaskFuture, isTaskPresent, isTaskPast} from './event';

const filters = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isTaskFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isTaskPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isTaskPast(event.dateTo)),
};

export {filters};
