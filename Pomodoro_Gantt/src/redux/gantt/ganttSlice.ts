import { createSlice } from '@reduxjs/toolkit';

export interface GanttSettings {
  time: {
    pomodoroTime: number;
    shortBreak: number;
    longBreak: number;
  };
}
interface GanttState {
  settings: GanttSettings;
}

const initialState: GanttState = {
  settings:{time: {
    pomodoroTime: 25,
    shortBreak: 5,
    longBreak: 15,
  }}
};

export const ganttSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
   
  },
  extraReducers: (_builder) => {}
});


export default ganttSlice.reducer;
