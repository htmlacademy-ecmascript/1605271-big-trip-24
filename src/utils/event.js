import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const now = () => dayjs();

const humanizeEventDueDate = (date, format) => (date ? dayjs(date).format(format) : '');
const capitalizeFirstLetter = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

const calculateDuration = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start)));

const formatDuration = ({days, hours, minutes}) => {
  const d = days ? `${String(days).padStart(2, '0')}D ` : '';
  const h = hours || days ? `${String(hours).padStart(2, '0')}H ` : '';
  const m = `${String(minutes).padStart(2, '0')}M`;
  return (d + h + m).trim();
};

function formatDateDifference(startDate, endDate) {
  const calculatedDuration = calculateDuration(startDate, endDate);

  const totalDays = calculatedDuration.asDays();

  return formatDuration({
    days: Math.floor(totalDays),
    hours: calculatedDuration.hours(),
    minutes: calculatedDuration.minutes(),
  });
}


const findItemByField = (items, field, value) => items.find((item) => item[field] === value);

const getOffersByType = (offers, type) => findItemByField(offers, 'type', type)?.offers || [];
const getDestinationById = (destinations, id) => findItemByField(destinations, 'id', id);
const getDestinationByName = (destinations, name) => findItemByField(destinations, 'name', name);

const isPointFuture = (startDate) => dayjs(startDate).isAfter(now());
const isPointPresent = (startDate, endDate) => dayjs(startDate).isSameOrBefore(now()) && dayjs(endDate).isSameOrAfter(now());
const isPointPast = (endDate) => dayjs(endDate).isBefore(now());

const getNullValueWeight = (firstValue, secondValue) => {
  if (firstValue === null && secondValue === null) {
    return 0;
  }
  if (firstValue === null) {
    return 1;
  }
  if (secondValue === null) {
    return -1;
  }
  return null;
};

const sortDay = (firstItem, secondItem) => getNullValueWeight(firstItem.dateFrom, secondItem.dateFrom) ?? new Date(firstItem.dateFrom) - new Date(secondItem.dateFrom);
const sortTime = (firstItem, secondItem) => getNullValueWeight(firstItem.duration, secondItem.duration) ?? calculateDuration(secondItem.dateFrom, secondItem.dateTo).asMilliseconds() - calculateDuration(firstItem.dateFrom, firstItem.dateTo).asMilliseconds();
const sortPrice = (firstItem, secondItem) => getNullValueWeight(firstItem.price, secondItem.price) ?? secondItem.basePrice - firstItem.basePrice;

const extractEventOfferId = (input) => input.match(/event-offer-(.*?-1)/)?.[1] || null;

export {
  humanizeEventDueDate,
  capitalizeFirstLetter,
  formatDateDifference,
  getOffersByType,
  getDestinationById,
  getDestinationByName,
  isPointFuture,
  isPointPresent,
  isPointPast,
  sortDay,
  sortTime,
  sortPrice,
  extractEventOfferId
};
