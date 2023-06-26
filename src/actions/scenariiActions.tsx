import { createAsyncThunk} from '@reduxjs/toolkit'
import type { Scenario } from '../types'
import { update } from '../slices/scenariiSlice'

export const updateScenario = createAsyncThunk(
    'scenarii/update',
    async (data: Scenario, thunkAPI) => {
      thunkAPI.dispatch(update(data))
    }
)
