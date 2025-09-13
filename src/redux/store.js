import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filtersSlice'
import favoritesReducer from './favoritesSlice'
import loaderReducer from './loaderSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favorites: favoritesReducer,
    loader: loaderReducer
  }
})
