import express from "express";
import { registerUser } from "../Controllers/Authcontroller.js";
import { loginUser } from "../Controllers/Authcontroller.js";

const router = express.Router()

router.get('/', async(req , res)=>{
    res.send('Auth Route')
})

router.post('/register', registerUser )

router.post('/login', loginUser)

export default router