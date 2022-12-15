import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITagsState } from './type'

const initialState: ITagsState = {
  selectedTag: undefined,
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload
    },
  },
})

export const tagsAction = tagsSlice.actions
export default tagsSlice
