import { configureStore } from '@reduxjs/toolkit'
import generalSlice from '../redux/general/generalSlice'

const isDevelopement = import.meta.env.MODE === 'development'
//@ts-ignore
const middlewares: any[] = []
export const store = configureStore({
  reducer: {
    general: generalSlice,
  },
  devTools: isDevelopement,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
