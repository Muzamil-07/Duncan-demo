import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { boxSlice } from './features/box/boxSlice'
import { generalSlice } from './features/general/generalSlice'

const rootReducer = combineSlices(boxSlice, generalSlice)

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  })
}
