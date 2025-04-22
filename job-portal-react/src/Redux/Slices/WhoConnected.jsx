import { createSlice } from "@reduxjs/toolkit";
import { StorgeDatainLocalStorage } from "../../Api/conditions";

const who = localStorage?.getItem('who') || null;

const WhoSlice = createSlice({
    name:'who',
    initialState:who,
    reducers:{
        candidateConnected:(state)=>{
            StorgeDatainLocalStorage('who','candidate')
            return 'candidate'
        },
        employerConnected:(state)=>{
            StorgeDatainLocalStorage('who','employer')
            return 'employer'
        },
        disconnected:(state)=>{
            localStorage.removeItem('who')
            return null
        },
        
    }
})

export const {candidateConnected,employerConnected,disconnected} = WhoSlice.actions;
export default WhoSlice.reducer;