import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppTheme } from '../../common/enum';

const fetchInitPreferences = createAsyncThunk('general/fetchInit', async () => {
  try {
    return { theme: AppTheme.dark };
  } catch (e) {
    console.error(e);
    return { theme: AppTheme.dark };
  }
});

export { fetchInitPreferences };
