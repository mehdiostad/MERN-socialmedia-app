import axios from "axios";
// const baseURL = "http://localhost:5000/"
const baseURL ="http://51.89.107.233/api/"

const API = axios.create({baseURL})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId)=> API.get(`/user/${userId}`)
export const updateUser = (data , id) => API.put(`/user/${id}` , data)
export const getAllUsers = () => API.get('/user')
export const followUser = (data , id) => API.put(`/user/${id}/follow`, data)
export const unFollowUser = (data, id) => API.put(`/user/${id}/unfollow` , data)