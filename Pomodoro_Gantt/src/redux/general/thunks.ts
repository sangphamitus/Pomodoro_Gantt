import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitPreferences = createAsyncThunk('general/fetchInit', async () => {
  try {
    return {};
  } catch (e) {
    console.error(e);
  }
});

export { fetchInitPreferences };
