import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env.JWT_KEY


const authMiddleWare = async (req, res, next) => {
  try {
    console.log("test",req.headers);
    const token =  req.headers.authorization.split(" ")[1]

    console.log(token)
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log("decode:",decoded)
      
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;