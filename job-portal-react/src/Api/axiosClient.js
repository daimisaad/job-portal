import axios from "axios";

const axiosClient = axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true
})

// axiosClient.interceptors.request.use(config=>{
//     const token = localStorage.getItem('ACCESS_TOKEN');
//     if(token){
//         console.log('test')
//     }
// })

export default axiosClient