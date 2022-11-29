import axios from "axios";


// const baseURL = "http://localhost:5000/"
const baseURL ="http://51.89.107.233/api"


const API = axios.create({baseURL})

export const getTimelinePosts = (id)=>  API.get(`/post/${id}/poststimeline`)
export const likePost = (id , userId) => API.put(`post/${id}/like`, {userId})