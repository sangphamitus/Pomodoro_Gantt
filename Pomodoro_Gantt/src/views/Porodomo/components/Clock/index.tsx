import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../configs/hooks';
import { setCurrentInterval, setIsRunning, setMode } from '../../../../redux/pomodoro/pomodoroSlice';
import { PomodoroMode } from '../../../../common/enum';
import { increaseActPomo } from '../../../../redux/pomodoro/thunks';

const Clock = ({ className }: { className: string }) => {
  const dispatch = useAppDispatch();
  const { mode, settings, isRunning, currentInterval } = useAppSelector((state) => state.pomodoro);
  const { autoStartBreak, autoStartPomodoro, longBreakInterval, timer } = settings;
  const [second, setSecond] = useState<number>(0);
  const interval = useRef<ReturnType<typeof setInterval>>();

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
    if (autoStartPomodoro && mode === PomodoroMode.pomodoro && currentInterval != 0) {
      dispatch(setIsRunning(true));
      return;
    }
    if (autoStartBreak && (mode === PomodoroMode.shortBreak || mode === PomodoroMode.longBreak)) {
      dispatch(setIsRunning(true));
      return;
    }
    if (isRunning) dispatch(setIsRunning(false));
  }, [mode, timer]);

  const updateSecond = () => {
    if (!isRunning) return;
    interval.current = setInterval(() => {
      setSecond((second) => {
        document.title = `${formatTime(second - 1)} PomoAntt`;
        return second - 1;
      });
    }, 1000);
    if (second == 0) {
      if (mode === PomodoroMode.pomodoro) {
        dispatch(increaseActPomo());

        if (currentInterval === longBreakInterval) {
          dispatch(setCurrentInterval(0));
          dispatch(setMode(PomodoroMode.longBreak));
        } else {
          dispatch(setMode(PomodoroMode.shortBreak));
          dispatch(setCurrentInterval(currentInterval + 1));
        }
      } else if (mode === PomodoroMode.shortBreak || mode === PomodoroMode.longBreak) {
        dispatch(setMode(PomodoroMode.pomodoro));
      }
      clearInterval(interval.current);
    }
  };

  useEffect(() => {
    updateSecond();
    return () => clearInterval(interval.current);
  }, [isRunning, second]);

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
