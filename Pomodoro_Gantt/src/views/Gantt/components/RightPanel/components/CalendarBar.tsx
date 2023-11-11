import dayjs from 'dayjs';
import { memo, useEffect, useMemo, useRef } from 'react';
import { CALENDAR_HEIGHT, DAY_CELL_WIDTH, DISPLAY_RANGE, ROW_HEIGHT } from '../../../../../common/constants';
import { useAppSelector } from '../../../../../configs/hooks';

const CalendarBar = memo(() => {
  const { tabs } = useAppSelector((state) => state.general);
  const calendarRef = useRef<any>();
  const today = dayjs(new Date());

  const daysArray: number[] = useMemo(() => {
    return Array.from({ length: 2 * DISPLAY_RANGE + 1 }, (_, index) => index - DISPLAY_RANGE);
  }, []);

  useEffect(() => {
    calendarRef.current.scrollTo({ left: (DISPLAY_RANGE * 7 - 10) * DAY_CELL_WIDTH, behavior: 'smooth' });
  }, [tabs]);

  const width = daysArray.length * 7 * DAY_CELL_WIDTH;
  return (
    <div
      id="gantt"
      ref={calendarRef}
      className='bg-neural'
      style={{
        height: `${CALENDAR_HEIGHT}px`,
        width: `${width}px`,
        backgroundSize: `${DAY_CELL_WIDTH}px `,
      }}
    >
      {daysArray.map((_idx: number) => {
        const _week = today.add(_idx, 'week');
        const _nextWeek = _week.add(1, 'week');
        const _nextdays = _nextWeek.diff(_week, 'day');
        const _wIdx = _week.week();
        const _m = _week.format('MMM');
        return (
          <>
            <div
              key={`week_${_idx}`}
              className="absolute bg-neutral text-neutral-content border-[1px] border-neutral-content border-solid px-2 flex justify-between"
              style={{
                left: `${(_idx + DISPLAY_RANGE) * _nextdays * DAY_CELL_WIDTH}px`,
                width: `${_nextdays * DAY_CELL_WIDTH}px`,
                height: `${ROW_HEIGHT}px`,
                top: 0,
              }}
            >
              <span> {_wIdx}</span>

              <span>{_m}</span>
            </div>
            {Array.from({ length: _nextdays }, (_, index) => index).map((_dayIdx: number) => {
              const _date = _week.add(_dayIdx, 'day');
              return (
                <div
                  key={`day_${_dayIdx}`}
                  className={`absolute ${
                    _date.isToday() ? 'bg-info text-info-content' : 'bg-neutral text-neutral-content'
                  } border-[1px] border-neutral-content border-solid text-center`}
                  style={{
                    left: `${((_idx + DISPLAY_RANGE) * _nextdays + _dayIdx) * DAY_CELL_WIDTH}px`,
                    width: `${DAY_CELL_WIDTH}px`,
                    height: `${ROW_HEIGHT * 2}px`,
                    top: `${ROW_HEIGHT}px`,
                  }}
                >
                  {_date.format('ddd')}
                  <br />
                  {_date.format('D')}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
});

export default CalendarBar;
