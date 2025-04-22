import { createSlice } from "@reduxjs/toolkit";

const EmployerSlice = createSlice({
    name:'employer',
    initialState:{},
    reducers:{
        setEmployer:(state,action)=>{
            return action.payload
        },
        unSetEmployer:(state,action)=>{
            return {}
        },
    }
})

export const {setEmployer,unSetEmployer} = EmployerSlice.actions;
export default EmployerSlice.reducer