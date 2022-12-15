import { configureStore } from '@reduxjs/toolkit'
import searchBarSlice from './features/searchBar/slice'
import tagsSlice from './features/tags/slice'
import stackApi from './apis'

export const store = configureStore({
  reducer: {
    [stackApi.reducerPath]: stackApi.reducer,
    [tagsSlice.name]: tagsSlice.reducer,
    [searchBarSlice.name]: searchBarSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stackApi.middleware),
})

export type IRootState = ReturnType<typeof store.getState>

export type IAppDispatch = typeof store.dispatch

export default store
