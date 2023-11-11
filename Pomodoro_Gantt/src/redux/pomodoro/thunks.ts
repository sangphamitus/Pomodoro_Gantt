import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskStatus } from '../../common/enum';
import { RootState } from '../../configs/store';
import { setTasks } from './pomodoroSlice';
import { Task } from '../../interfaces';

const clearAllFinished = createAsyncThunk('pomodoro/clearAllFinished', async (_, { getState, dispatch }) => {
  try {
    const { tasks } = (getState() as RootState).pomodoro;
    const finishedTasks = Object.values(tasks).filter((task) => task.status !== TaskStatus.done);
    dispatch(setTasks(finishedTasks));
  } catch (e) {
    console.error(e);
  }
});

const clearAllActPomo = createAsyncThunk('pomodoro/clearAllActPomo', async (_, { getState, dispatch }) => {
  try {
    const { tasks } = (getState() as RootState).pomodoro;
    const finishedTasks = Object.keys(tasks).reduce((acc: Record<number, Task>, _key: string) => {
      const key = parseInt(_key);
      const { pomodoros } = tasks[key];
      Object.assign(acc[key], { ...tasks[key], pomodoros: { ...pomodoros, act: 0 } });
      return acc;
    }, {});

    dispatch(setTasks(finishedTasks));
  } catch (e) {
    console.error(e);
  }
});

export { clearAllFinished, clearAllActPomo };
