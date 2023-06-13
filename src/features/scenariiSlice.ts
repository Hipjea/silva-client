import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IScenario } from '../types'


export interface ScenariiState {
    scenarii: Array<IScenario>
}
  
const initialState: ScenariiState = {
    scenarii: []
}

/**
 * Scenarii slice containing the reducers
 */
export const scenariiSlice = createSlice({
    name: 'scenarii',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<Array<IScenario>>) => {
            state.scenarii = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { populate } = scenariiSlice.actions

export default scenariiSlice.reducer
  