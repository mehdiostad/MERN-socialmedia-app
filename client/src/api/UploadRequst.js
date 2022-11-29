import axios from "axios";

// const baseURL = "http://localhost:5000/"
const baseURL ="http://51.89.107.233/api"



const API = axios.create({ baseURL });
export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (data) => API.post("/post", data);
