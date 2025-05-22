import { createSlice } from "@reduxjs/toolkit";

const JobsSlice = createSlice({
    name:'jobs',
    initialState:[],
    reducers:{
        setJobs:(state,action)=>{
            return action.payload
        },
        unSetJobs:(state,action)=>{
            return {}
        },
    }
})

export const {setJobs,unSetJobs} = JobsSlice.actions;
export default JobsSlice.reducer