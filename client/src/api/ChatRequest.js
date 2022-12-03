import axios from "axios"
// const baseURL = "http://localhost:5000/"
const baseURL ="http://mehdimedia.tk/api/"
const API = axios.create({baseURL})

export const userChats = (id) => API.get(`/chat/${id}`)