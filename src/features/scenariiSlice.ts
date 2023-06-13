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
        },
        update: (state, action) => {
            return {
                ...state,
                scenarii: state.scenarii.map((s: IScenario) => s.id == action.payload.id ? action.payload : s)
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { populate, update } = scenariiSlice.actions

export default scenariiSlice.reducer
  