import axios from "axios";

// const baseURL = "http://localhost:5000/"
const baseURL ="http://mehdimedia.tk/api/"

const API = axios.create({baseURL})

export const getMessages = (id) => API.get(`/message/${id}`)
export const addMessage =(data)=> API.post('/message/' , data)