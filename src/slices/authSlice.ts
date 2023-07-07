import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginUser, signupUser } from '../actions/authActions'
import { UserProps } from '../types'


export interface AuthState {
  isAuthenticated: boolean
  isConfirmed: boolean
  email: null | string
  firstname: null | string
  lastname: null | string
}

const initialState: AuthState = {
  isAuthenticated: false,
  isConfirmed: false,
  email: null,
  firstname: null,
  lastname: null,
}

/**
 * Auth slice containing the reducers
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserProps>) => {
      const { email, firstname, lastname } = action.payload;
      state.isAuthenticated = true
      state.email = email
      state.firstname = firstname
      state.lastname = lastname
    },
    signOut: (state) => {
      state.isAuthenticated = false
      state.email = null
      state.firstname = null
      state.lastname = null
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    updateData: (state, action: PayloadAction<UserProps>) => {
      const { firstname, lastname } = action.payload;
      state.firstname = firstname
      state.lastname = lastname
    },
    confirm: (state, action: PayloadAction<boolean>) => {
      state.isConfirmed = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false
    })
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
    })
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isAuthenticated = false
    })
  }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut, setEmail, updateData, confirm } = authSlice.actions

export default authSlice.reducer
