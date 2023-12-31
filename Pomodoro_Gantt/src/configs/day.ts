import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import duration from 'dayjs/plugin/duration';

const configDayJS = () => {
  dayjs.extend(isToday);
  dayjs.extend(weekOfYear);
  dayjs.extend(updateLocale);
  dayjs.extend(isBetween);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(duration);
  dayjs.updateLocale('en', {
    weekStart: 0,
  });
};
export default configDayJS;
