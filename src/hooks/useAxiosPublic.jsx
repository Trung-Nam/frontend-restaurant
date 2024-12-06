import axios from 'axios'

const axiosPublic = axios.create({
    baseURL: 'https://backend-restaurant-b5d2.onrender.com',
})

const useAxiosPublic = () => {
    return axiosPublic
}

export default useAxiosPublic;

