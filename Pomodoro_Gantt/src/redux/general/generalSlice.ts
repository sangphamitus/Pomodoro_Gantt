import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppStatus, AppTab, AppTheme } from '../../common/enum';
import { fetchInitPreferences } from './thunks';

interface GeneralState {
  status: AppStatus;
  tabs: AppTab;
  theme: AppTheme;
}

const initialState: GeneralState = {
  status: AppStatus.loading,
  tabs: AppTab.porodomo,
  theme: AppTheme.dark,
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
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitPreferences.fulfilled, (state, action: PayloadAction<{ theme: AppTheme }>) => {
        const { theme = AppTheme.forest } = action.payload;
        state.status = AppStatus.success;
        document.documentElement.setAttribute('data-theme', theme);
        state.theme = theme;
      })
      .addCase(fetchInitPreferences.rejected, (state) => {
        state.status = AppStatus.error;
      });
  },
});

export const { setAppStatus, setTabs, setTheme } = generalSlice.actions;

export default generalSlice.reducer;
