import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDiseaseItem } from 'types/disease.d'
import type { RootState } from '.'

export interface ISearchState {
  searchText: string
  splitSearchText: string[]
  items: IDiseaseItem[]
}

const INITAL_STATE: ISearchState = {
  searchText: '',
  splitSearchText: [],
  items: [],
}

export const diseaseSearchSlice = createSlice({
  name: 'dieaseSearch',
  initialState: INITAL_STATE,
  reducers: {
    setSearchText: (state: ISearchState, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    setSplitSearchText: (state: ISearchState, action: PayloadAction<string[]>) => {
      state.splitSearchText = action.payload
    },
    setDiseaseItems: (state: ISearchState, action: PayloadAction<IDiseaseItem[]>) => {
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
