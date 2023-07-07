import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, CLIENT_TOKEN_NAME } from '../config'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { fetchAll } from '../slices/cardsSlice'


/**
 * Get all cards
 */
export const getCards = createAsyncThunk(
  'cards/fetchAll',
  async (_: null, thunkAPI) => {
    try {
      const authToken = Cookies.get(CLIENT_TOKEN_NAME)
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }

      return await axios.get(`${API_URL}/api/v1/cards`, config).then((res: AxiosResponse) => {
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
      const authToken = Cookies.get(CLIENT_TOKEN_NAME)
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }

      return await axios.get(`${API_URL}/api/v1/cards/${id}`, config).then((res: AxiosResponse) => {
        return res.data
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

