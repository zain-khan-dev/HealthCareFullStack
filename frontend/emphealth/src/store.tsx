import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from "./reducer/EmployeeSlice"
import SlotReducer from "./reducer/SlotSlice"

export const store = configureStore({
  reducer: {employee:EmployeeReducer, slot:SlotReducer},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch