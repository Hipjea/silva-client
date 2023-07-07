import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IScenario, ScenariiState } from '../types'


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
            const { id, name, author } = action.payload
            const existingScenario = state.scenarii.find(scenario => scenario.id == id)

            if (existingScenario) {
                existingScenario.attributes.name = name
                existingScenario.attributes.author = author
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { populate, update } = scenariiSlice.actions

export default scenariiSlice.reducer
