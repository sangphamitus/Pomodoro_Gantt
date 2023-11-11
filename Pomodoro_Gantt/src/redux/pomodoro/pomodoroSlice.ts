import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PomodoroMode } from '../../common/enum';
import { Task } from '../../interfaces';

export interface PomodoroSettings {
  colors: Record<PomodoroMode, string>;
  timer: Record<PomodoroMode, number>;
}
interface PomodoroState {
  settings: PomodoroSettings;
  mode: PomodoroMode;
  isRunning: boolean;
  tasks: Record<number, Task>;
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
  },
  mode: PomodoroMode.pomodoro,
  isRunning: false,
  tasks: {},
};

export const porodomoSlice = createSlice({
  name: 'general',
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
  },
  extraReducers: (_builder) => {},
});
export const { setMode, setIsRunning, appendTask, removeTask, setTaskAttribute } = porodomoSlice.actions;
export default porodomoSlice.reducer;
