import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://cloth-backend-2kmewue4o-aarijs-projects-e50dbb08.vercel.app/api',
    // baseURL: 'http://localhost:3000/api',
   

    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default axiosInstance;


// https://clothbackend-umber.vercel.app/api