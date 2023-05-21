import { configureStore } from '@reduxjs/toolkit'
import feedbacksReducer from "./feedBackSlice"

export const store = configureStore({
  reducer: {
    feedbacks: feedbacksReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch