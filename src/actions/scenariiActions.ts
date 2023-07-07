import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../config'
import { configHeaders } from '../cookies'
import axios, { AxiosResponse } from 'axios'
import type { Scenario } from '../types'
import { populate, update } from '../slices/scenariiSlice'


interface UpdateProps {
  id: string | number
  data: Scenario
}

/**
 * Get all scenarii
 */
export const getScenarii = createAsyncThunk(
  'scenarii/fetchAll',
  async (_: null, thunkAPI) => {
    try {
      return await axios.get(`${API_URL}/api/v1/scenarii`, configHeaders).then((res: AxiosResponse) => {
        return thunkAPI.dispatch(populate(res.data))
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

/**
 * Fetch scenario
 */
export const getScenario = createAsyncThunk(
  'scenarii/fetch',
  async (id: string, thunkAPI) => {
    try {
      return await axios.get(`${API_URL}/api/v1/scenarii/${id}`, configHeaders).then((res: AxiosResponse) => {
        return res.data
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

/**
 * Update scenario
 */
export const updateScenario = createAsyncThunk(
  'scenarii/update',
  async (data: UpdateProps, thunkAPI) => {
    try {
      return await axios.patch(`${API_URL}/api/v1/scenarii/${data.id}`, { scenario: data.data }, configHeaders)
        .then((_: AxiosResponse) => {
          return thunkAPI.dispatch(update(data))
        })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)
