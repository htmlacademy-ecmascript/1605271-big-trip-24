import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function capitalizeFirstLetter(str) {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDateDifference(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diff = end.diff(start);

  const d = dayjs.duration(diff).days();
  const h = dayjs.duration(diff).hours();
  const m = dayjs.duration(diff).minutes();

  let result = '';
  if (d > 0) {
    result += `${String(d).padStart(2, '0')}D `;
  }
  if (h > 0 || d > 0) {
    result += `${String(h).padStart(2, '0')}H `;
  }
  result += `${String(m).padStart(2, '0')}M`;

  return result.trim();
}

function getOffersByType(offers, type) {
  return offers.find((offer) => offer.type === type).offers;
}

function getDestinationById(destinations, id) {
  return destinations.find((destination) => destination.id === id);
}

function isTaskFuture(startDate) {
  const now = dayjs();
  return dayjs(startDate).isAfter(now);
}

function isTaskPresent(startDate, endDate) {
  const now = dayjs();
  return dayjs(startDate).isSameOrBefore(now) && dayjs(endDate).isSameOrAfter(now);
}

function isTaskPast(endDate) {
  const now = dayjs();
  return dayjs(endDate).isBefore(now);
}

export {humanizeEventDueDate, capitalizeFirstLetter, formatDateDifference, getOffersByType, getDestinationById, isTaskFuture, isTaskPresent, isTaskPast };
