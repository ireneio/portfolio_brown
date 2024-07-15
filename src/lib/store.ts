import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './features/global/globalSlice'
import projectSlice from './features/project/projectSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      globalSlice,
      projectSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
