import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://cloth-backend-aarijfarhan-aarijs-projects-e50dbb08.vercel.app/',
    // baseURL: 'http://localhost:3000/api',
   

    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default axiosInstance;


// https://clothbackend-umber.vercel.app/api