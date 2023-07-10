import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../config'
import { configHeaders } from '../cookies'
import axios, { AxiosResponse } from 'axios'
import { fetchAll } from '../slices/cardsSlice'


/**
 * Get all cards
 */
export const getCards = createAsyncThunk(
  'cards/fetchAll',
  async (_: null, thunkAPI) => {
    try {
      return await axios.get(`${API_URL}/api/v1/cards`, configHeaders).then((res: AxiosResponse) => {
        return thunkAPI.dispatch(fetchAll(res.data))
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

/**
 * Fetch single card
 */
export const getCard = createAsyncThunk(
  'cards/fetch',
  async (id: string, thunkAPI) => {
    try {
      return await axios.get(`${API_URL}/api/v1/cards/${id}`, configHeaders).then((res: AxiosResponse) => {
        return res.data
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

