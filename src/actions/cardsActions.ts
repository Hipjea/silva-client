import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../config'
import { configHeaders } from '../cookies'
import axios, { AxiosResponse } from 'axios'
import { fetchAll, update } from '../slices/cardsSlice'
import { Card } from '../types'


interface UpdateProps {
  id: string | number
  data: Card
}

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

/**
 * Update card
 */
export const updateCard = createAsyncThunk(
  'cards/update',
  async (data: UpdateProps, thunkAPI) => {
    try {
      return await axios.patch(`${API_URL}/api/v1/cards/${data.id}`, { card: data.data }, configHeaders)
        .then((_: AxiosResponse) => {
          return thunkAPI.dispatch(update(data))
        })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)
