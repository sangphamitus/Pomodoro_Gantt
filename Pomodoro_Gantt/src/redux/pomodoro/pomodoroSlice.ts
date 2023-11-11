import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PomodoroMode } from '../../common/enum';
import { Task } from '../../interfaces';

export interface PomodoroSettings {
  colors: Record<PomodoroMode, string>;
  timer: Record<PomodoroMode, number>;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
  longBreakInterval: number;
}
interface PomodoroState {
  settings: PomodoroSettings;
  mode: PomodoroMode;
  isRunning: boolean;
  tasks: Record<number, Task>;
  currentInterval: number;
}

const initialState: PomodoroState = {
  settings: {
    colors: {
      [PomodoroMode.pomodoro]: '#FA7070',
      [PomodoroMode.shortBreak]: '#A6CF98',
      [PomodoroMode.longBreak]: '#87C4FF',
    },
    timer: {
      [PomodoroMode.pomodoro]: 25,
      [PomodoroMode.shortBreak]: 5,
      [PomodoroMode.longBreak]: 20,
    },
    autoStartPomodoro: false,
    autoStartBreak: false,
    longBreakInterval: 4,
  },
  mode: PomodoroMode.pomodoro,
  isRunning: false,
  tasks: {},
  currentInterval: 0,
};

export const porodomoSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<PomodoroMode>) => {
      state.mode = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    appendTask: (state, action: PayloadAction<Task>) => {
      state.tasks[action.payload.id] = action.payload;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      delete state.tasks[action.payload];
    },
    setTaskAttribute: (state, action: PayloadAction<{ id: number; value: Partial<Task> }>) => {
      state.tasks[action.payload.id] = { ...state.tasks[action.payload.id], ...action.payload.value };
    },
    setTasks: (state, action: PayloadAction<Record<number, Task>>) => {
      state.tasks = action.payload;
    },
    setPomodoroSettings: (state, action: PayloadAction<PomodoroSettings>) => {
      const { timer, longBreakInterval } = action.payload;
      //@ts-ignore
      const newTimer: Record<PomodoroMode, number> = Object.keys(timer).reduce(
        (acc: Record<PomodoroMode, number>, key: string) => {
          const _key = key as PomodoroMode;
          Object.assign(acc, { [_key]: parseInt(timer[_key].toString()) });
          return acc;
        },
        {}
      );
      state.settings = {
        ...state.settings,
        ...action.payload,
        timer: newTimer,
        longBreakInterval: parseInt(longBreakInterval.toString()),
      };
    },
    setCurrentInterval: (state, action: PayloadAction<number>) => {
      state.currentInterval = action.payload;
    },
  },
  extraReducers: (_builder) => {},
});
export const {
  setMode,
  setIsRunning,
  appendTask,
  removeTask,
  setTaskAttribute,
  setTasks,
  setPomodoroSettings,
  setCurrentInterval,
} = porodomoSlice.actions;
export default porodomoSlice.reducer;
