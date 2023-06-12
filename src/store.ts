import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './features/authSlice'
import logger from 'redux-logger'


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch