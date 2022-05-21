import type { RootState } from '.'
import { createSlice } from '@reduxjs/toolkit'

export interface IMoveState {
  moveNum: number
}

const INITAL_STATE: IMoveState = {
  moveNum: 0,
}

export const indexLocation = createSlice({
  name: 'indexLocaiton',
  initialState: INITAL_STATE,
  reducers: {
    setIncrease: (state: IMoveState) => {
      state.moveNum += 1
    },
    setDecrease: (state: IMoveState) => {
      state.moveNum -= 1
    },
    setReset: (state: IMoveState) => {
      state.moveNum = 0
    },
  },
})

export const { setIncrease, setDecrease, setReset } = indexLocation.actions

export const getMoveNum = (state: RootState): number => state.move.moveNum

export default indexLocation.reducer
