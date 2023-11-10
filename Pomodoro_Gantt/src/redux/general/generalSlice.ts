import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppStatus } from '../../common/enum'

interface GeneralState {
  status: AppStatus
}

const initialState: GeneralState = {
  status: AppStatus.error,
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload
    },
  },
  //@ts-ignore
  extraReducers: (_builder) => {},
})

export const { setAppStatus } = generalSlice.actions

export default generalSlice.reducer
