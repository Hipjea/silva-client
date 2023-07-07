import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, CLIENT_TOKEN_NAME } from '../config'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
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
      const authToken = Cookies.get(CLIENT_TOKEN_NAME)
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }

      return await axios.get(`${API_URL}/api/v1/scenarii`, config).then((res: AxiosResponse) => {
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
      const authToken = Cookies.get(CLIENT_TOKEN_NAME)
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }

      return await axios.get(`${API_URL}/api/v1/scenarii/${id}`, config).then((res: AxiosResponse) => {
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
      console.log("data => ", data.data)
      const authToken = Cookies.get(CLIENT_TOKEN_NAME)
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }

      return await axios.patch(`${API_URL}/api/v1/scenarii/${data.id}`, { scenario: data.data }, config)
        .then((_: AxiosResponse) => {
          return thunkAPI.dispatch(update(data))
        })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)
