import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISearchBarState } from './type'

const initialState: ISearchBarState = {
  keyword: undefined,
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload
    },
  },
})

export const searchBarAction = searchBarSlice.actions
export default searchBarSlice
