import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { API_URL, CLIENT_TOKEN_NAME } from '../config'
import axios, { AxiosRequestHeaders } from 'axios'
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

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: User, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/login`, data).then(
        res => {
          if (res && res.headers) {
            const headers = res.headers as AxiosRequestHeaders
            const authHeader = headers.get('Authorization') as string
            if (authHeader.startsWith('Bearer ')) {
              const accessToken = authHeader.substring(7, authHeader.length)
              Cookies.set(CLIENT_TOKEN_NAME, accessToken, { secure: true })
            }
          }

          thunkAPI.dispatch(setEmail(res.data.data.email))
        }
      )
    } catch (error) {
      console.log(error)
      return {}
    }
  }
)

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
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut, setEmail } = authSlice.actions

export default authSlice.reducer
