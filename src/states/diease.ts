import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

export interface SearchState {
  text: string
}

const INITAL_STATE: SearchState = {
  text: '',
}

export const dieaseSearchSlice = createSlice({
  name: 'dieaseSearch',
  initialState: INITAL_STATE,
  reducers: {
    searchValue: (state: SearchState, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const searchActions = dieaseSearchSlice.actions
export default dieaseSearchSlice.reducer

export const getSearchValue = (state: RootState): string => state.diease.text
