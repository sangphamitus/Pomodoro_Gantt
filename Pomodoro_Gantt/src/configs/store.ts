import { configureStore } from '@reduxjs/toolkit'
import generalSlice from '../redux/general/generalSlice'
import ganttSlice from '../redux/gantt/ganttSlice'
import pomodoroSlice from '../redux/pomodoro/pomodoroSlice'

const isDevelopement = import.meta.env.MODE === 'development'
//@ts-ignore
const middlewares: any[] = []
export const store = configureStore({
  reducer: {
    general: generalSlice,
    gantt:ganttSlice,
    pomodoro:pomodoroSlice
  },
  devTools: isDevelopement,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
