import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDiseaseItem } from 'types/disease.d'
import type { RootState } from '.'

export interface SearchState {
  searchText: string[]
  items: IDiseaseItem[]
}

const INITAL_STATE: SearchState = {
  searchText: [],
  items: [],
}

export const diseaseSearchSlice = createSlice({
  name: 'dieaseSearch',
  initialState: INITAL_STATE,
  reducers: {
    setSearchText: (state: SearchState, action: PayloadAction<string[]>) => {
      state.searchText = action.payload
    },
    setDiseaseItems: (state: SearchState, action: PayloadAction<IDiseaseItem[]>) => {
      state.items = action.payload
    },
  },
})

// export const searchActions = diseaseSearchSlice.actions
export const { setSearchText, setDiseaseItems } = diseaseSearchSlice.actions

export const getSearchText = (state: RootState): any => state.disease.searchText
export const getDiseaseItems = (state: RootState): IDiseaseItem[] => state.disease.items

export default diseaseSearchSlice.reducer
