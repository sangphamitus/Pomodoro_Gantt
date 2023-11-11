import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../interfaces';


interface GanttState {
  items:Record<number,Item>
  weekday:number
}

const initialState: GanttState = {
  items:{},
  weekday:0
};

export const ganttSlice = createSlice({
  name: 'gantt',
  initialState,
  reducers: {
  },
  extraReducers: (_builder) => {}
});


export default ganttSlice.reducer;
