import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../configs/hooks';
import { setCurrentInterval, setIsRunning, setMode } from '../../../../redux/pomodoro/pomodoroSlice';
import { PomodoroMode } from '../../../../common/enum';

const Clock = ({ className }: { className: string }) => {
  const dispatch = useAppDispatch();
  const { mode, settings, isRunning, currentInterval } = useAppSelector((state) => state.pomodoro);
  const { autoStartBreak, autoStartPomodoro, longBreakInterval, timer } = settings;
  const [second, setSecond] = useState<number>(0);
  const interval = useRef<any>();

  const onClickHandler = () => {
    dispatch(setIsRunning(!isRunning));
  };
  const formatTime = (_second: number) => {
    const sec = _second % 60;
    const min = Math.floor(_second / 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    setSecond(timer[mode] * 60);
    if (isRunning) dispatch(setIsRunning(false));
    if (autoStartPomodoro && mode === PomodoroMode.pomodoro && currentInterval != 0) {
      dispatch(setIsRunning(true));
    }
    if (autoStartBreak && (mode === PomodoroMode.shortBreak || mode === PomodoroMode.longBreak)) {
      dispatch(setIsRunning(true));
    }
  }, [mode, timer]);

  useEffect(() => {
    if (!isRunning) return;

    interval.current = setInterval(() => {
      if (second > 0) {
        setSecond((second) => {
          document.title = `${formatTime(second - 30)} PomoAntt`;
          return second - 30;
        });
      } else {
        dispatch(setIsRunning(false));

        if (autoStartBreak && mode === PomodoroMode.pomodoro) {
          if (currentInterval === longBreakInterval) {
            dispatch(setCurrentInterval(0));
            dispatch(setMode(PomodoroMode.longBreak));
          } else {
            dispatch(setMode(PomodoroMode.shortBreak));
            dispatch(setCurrentInterval(currentInterval + 1));
          }
        }
        if (autoStartPomodoro && (mode === PomodoroMode.shortBreak || mode === PomodoroMode.longBreak)) {
          dispatch(setMode(PomodoroMode.pomodoro));
        }
        clearInterval(interval.current);
      }
    }, 1000);

    return () => clearInterval(interval.current);
  }, [isRunning, mode]);

  return (
    <div className={`card w-96 ${className}`}>
      <div className="card-body items-center text-center flex flex-col gap-2">
        <h1 className="card-title text-6xl">{formatTime(second)}</h1>
        <div className="card-actions justify-end">
          <button className="btn" onClick={onClickHandler}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;
