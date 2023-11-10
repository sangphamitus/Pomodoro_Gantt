import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppStatus, AppTab } from '../../common/enum';
import { fetchInitPreferences } from './thunks';

interface GeneralState {
  status: AppStatus;
  tabs: AppTab;
}

const initialState: GeneralState = {
  status: AppStatus.loading,
  tabs: AppTab.porodomo,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload;
    },
    setTabs: (state, action: PayloadAction<AppTab>) => {
      state.tabs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitPreferences.fulfilled, (state) => {
        state.status = AppStatus.success;
      })
      .addCase(fetchInitPreferences.rejected, (state) => {
        state.status = AppStatus.error;
      });
  },
});

export const { setAppStatus,setTabs } = generalSlice.actions;

export default generalSlice.reducer;
