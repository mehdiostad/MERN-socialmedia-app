import express from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


const upload = multer({ storage });

router.post(
  "/",
  upload.single("file"), (req, res) => {
    try {
      
      return res.status(200).json("File Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
