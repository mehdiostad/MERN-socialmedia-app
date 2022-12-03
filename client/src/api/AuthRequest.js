import axios from "axios"

// const baseURL = "http://localhost:5000/"
const baseURL ="http://mehdimedia.tk/api/"
const API = axios.create({baseURL:baseURL})

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)