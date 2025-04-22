import { createSlice } from "@reduxjs/toolkit";

const CandidateSlice = createSlice({
    name:'candidate',
    initialState:{},
    reducers:{
        setCandidate:(state,action)=>{
            return action.payload
        },
        unSetCandidate:(state,action)=>{
            return {}
        },
    }
})

export const {setCandidate,unSetCandidate} = CandidateSlice.actions;
export default CandidateSlice.reducer