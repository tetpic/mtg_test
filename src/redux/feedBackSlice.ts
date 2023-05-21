import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit'
import { defaultLang } from '../helpers/constants'
import { getFeedbacks } from '../helpers/getFeedbacks'
import { store } from './store'

export interface FeedbackType {
    [key: string] : {
        name?: string,
        review?: string,
        date?: string
    }
}

export interface FeedbackState {
    currentFeedbacks: {[key: string]: FeedbackType},
    currentLang: string,
    isSet: boolean,
    error: string,
    limit: number
}

const initialState: FeedbackState = {   
    currentFeedbacks: {},
    currentLang: localStorage.getItem("lang")??defaultLang,
    isSet: false,
    error: '',    
    limit: 10        
}

export const getCountryFeedbacks = createAsyncThunk(
    'main/getCountryFeedbacks',
    async (lang: string) => {   
        const response = await getFeedbacks(lang).then(res=>{
            return res as {[key: string]: FeedbackType}
        })
        return response
    }
)

export const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    setLang: (state, action)=>{
        state.currentLang =  action.payload
        localStorage.setItem("lang", action.payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(getCountryFeedbacks.pending, (state)=> {
        state.isSet = false
        state.error = ""
    })
    builder.addCase(getCountryFeedbacks.fulfilled, (state, action)=> {
        state.currentFeedbacks = action.payload
        state.isSet = true
        state.error = ""
    })
    builder.addCase(getCountryFeedbacks.rejected, (state, action)=> {        
        state.error = action.error.message??"Сервер не отвечает"
    })      
  },
})

export const {setLang} = feedbackSlice.actions

export default feedbackSlice.reducer