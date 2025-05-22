import { configureStore } from "@reduxjs/toolkit"
import WhoSlice from './Slices/WhoConnected'
import candidateSlice from './Slices/CandidateSlice'
import employerSlice from './Slices/EmployersSlice'
import JobsSlice from './Slices/JobsSlice'
 const store = configureStore({
    reducer:{
        who:WhoSlice,
        candidate:candidateSlice,
        employer:employerSlice,
        jobs:JobsSlice,
    }
})

export default store;