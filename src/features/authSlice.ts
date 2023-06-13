import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { API_URL, CLIENT_TOKEN_NAME } from '../config'
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios'
import type { User } from '../types'
import Cookies from 'js-cookie'


export interface AuthState {
  isAuthenticated: boolean
  email: null | string
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null
}

/**
 * User login action
 */
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: User, thunkAPI) => {
    try {
      return await axios.post(`${API_URL}/login`, data).then((res: AxiosResponse) => {
        const headers = res.headers as AxiosResponseHeaders
        const data = res.data as AxiosResponse
        const authHeader = headers.get('Authorization') as string

        if (authHeader.startsWith('Bearer ')) {
          const accessToken = authHeader.substring(7, authHeader.length)
          Cookies.set(CLIENT_TOKEN_NAME, accessToken, { secure: true })
        }

        thunkAPI.dispatch(setEmail(data.data.email))
      })
    } catch (error) {
      console.log(error)
      return {}
    }
  }
)

/**
 * User logout action
 */
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_: () => void, thunkAPI) => {
    Cookies.remove(CLIENT_TOKEN_NAME)
    thunkAPI.dispatch(signOut())
  })

/**
 * Auth slice containing the reducers
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.email = action.payload
    },
    signOut: (state) => {
      state.isAuthenticated = false
      state.email = null
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut, setEmail } = authSlice.actions

export default authSlice.reducer
