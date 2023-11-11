import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../configs/hooks';
import { setIsRunning } from '../../../../redux/pomodoro/pomodoroSlice';

const Clock = ({ className }: { className: string }) => {
  const dispatch = useAppDispatch();
  const { mode, settings, isRunning } = useAppSelector((state) => state.pomodoro);
  const { timer } = settings;
  const [second, setSecond] = useState<number>(0);

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
  }, [mode]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond((second) => {
          document.title = `${formatTime(second - 1)} PomoAntt`;
          return second - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
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
