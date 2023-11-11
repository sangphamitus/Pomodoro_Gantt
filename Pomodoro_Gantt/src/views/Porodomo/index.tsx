import { useMemo } from 'react';
import { PomodoroMode } from '../../common/enum';
import { useAppDispatch, useAppSelector } from '../../configs/hooks';
import { setMode } from '../../redux/pomodoro/pomodoroSlice';
import Clock from './components/Clock';
import TaskBoard from './components/TaskBoard';

interface TabComponent {
  className: string;
  title: string;
}

const Porodomo = () => {
  const dispatch = useAppDispatch();
  const { mode, settings } = useAppSelector((state) => state.pomodoro);
  const tabs: { [key: string]: TabComponent } = useMemo(
    () => ({
      [PomodoroMode.pomodoro]: {
        className: 'bg-primary text-primary-content',
        title: 'Pomodoro',
      },
      [PomodoroMode.shortBreak]: { className: 'bg-secondary text-secondary-content', title: 'Short Break' },
      [PomodoroMode.longBreak]: { className: 'bg-accent text-secondary-content', title: 'Long Break' },
    }),
    []
  );
  const classes = tabs[mode].className;
  return (
    <div className="flex justify-center">
      <div className={`rounded-lg p-5`} style={{ boxShadow: `0px 0px 30px ${settings.colors[mode]}` }}>
        <div className={`tabs tabs-boxed justify-center  `}>
          {Object.keys(tabs).map((_tab) => (
            <a
              key={_tab}
              className={`tab ${_tab === mode ? 'tab-active' : ''}`}
              onClick={() => dispatch(setMode(_tab as PomodoroMode))}
            >
              {tabs[_tab].title}
            </a>
          ))}
        </div>
        <Clock className={classes} />
        <div className="divider"></div>
        <TaskBoard />
      </div>
    </div>
  );
};

export default Porodomo;
