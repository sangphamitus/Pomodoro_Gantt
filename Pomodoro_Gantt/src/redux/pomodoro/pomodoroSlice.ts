import { createSlice } from '@reduxjs/toolkit';

interface PomodoroState {
}

const initialState: PomodoroState = {

};

export const porodomoSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
   
  },
  extraReducers: (_builder) => {}
});


export default porodomoSlice.reducer;
