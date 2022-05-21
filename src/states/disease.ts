import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDiseaseItem } from 'types/disease.d'
import type { RootState } from '.'

export interface SearchState {
  searchText: string
  splitSearchText: string[]
  items: IDiseaseItem[]
}

const INITAL_STATE: SearchState = {
  searchText: '',
  splitSearchText: [],
  items: [],
}

export const diseaseSearchSlice = createSlice({
  name: 'dieaseSearch',
  initialState: INITAL_STATE,
  reducers: {
    setSearchText: (state: SearchState, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    setSplitSearchText: (state: SearchState, action: PayloadAction<string[]>) => {
      state.splitSearchText = action.payload
    },
    setDiseaseItems: (state: SearchState, action: PayloadAction<IDiseaseItem[]>) => {
      state.items = action.payload
    },
  },
})

// export const searchActions = diseaseSearchSlice.actions
export const { setSearchText, setSplitSearchText, setDiseaseItems } = diseaseSearchSlice.actions

export const getSearchText = (state: RootState): string => state.disease.searchText
export const getSplitSearchText = (state: RootState): string[] => state.disease.splitSearchText
export const getDiseaseItems = (state: RootState): IDiseaseItem[] => state.disease.items

export default diseaseSearchSlice.reducer
