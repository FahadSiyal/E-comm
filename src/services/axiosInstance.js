import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://clothbackenddepolyment.vercel.app/api',
    // baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://cloth-backend-pwni.vercel.app/api',
    // baseURL: 'https://ecomcloth1.netlify.app/shop',
   

    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default axiosInstance;


// https://clothbackend-umber.vercel.app/api