import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRout from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRout.js";
import MessageRoute from "./Routes/MessageRoute.js";
import cors from "cors";

//Routes

const app = express();

//to serve images for public

app.use(express.static("./Public"));
app.use("images", express.static("images"));

//Middelwares

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { authSource: "admin" },
    user: process.env.USERNAME,
    pass: process.env.PASS,
  })
  .then(() =>
    app.listen(
      process.env.PORT,
      console.log(`Listening on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err.message));

//usage of routes

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRout);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
