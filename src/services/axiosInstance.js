import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://cloth-backend-kxf1.vercel.app/api',
    // baseURL: 'http://localhost:3000/api',
   

    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default axiosInstance;


// https://clothbackend-umber.vercel.app/api