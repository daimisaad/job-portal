import { configureStore } from "@reduxjs/toolkit"
import WhoSlice from './Slices/WhoConnected'
import candidateSlice from './Slices/CandidateSlice'
import employerSlice from './Slices/EmployersSlice'
 const store = configureStore({
    reducer:{
        who:WhoSlice,
        candidate:candidateSlice,
        employer:employerSlice,
    }
})

export default store;