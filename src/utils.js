import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

export {humanizeEventDueDate, capitalizeFirstLetter, formatDateDifference };
