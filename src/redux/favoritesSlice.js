import { createSlice } from '@reduxjs/toolkit'

const localFavorites = JSON.parse(localStorage.getItem('favoriteIds')) || []

const initialState = {
  favoriteIds: localFavorites
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id)
      } else {
        state.favoriteIds.push(id)
      }
      localStorage.setItem('favoriteIds', JSON.stringify(state.favoriteIds))
    },
    clearFavorites: (state) => {
      state.favoriteIds = []
      localStorage.removeItem('favoriteIds')
    }
  }
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer