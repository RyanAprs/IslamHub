import { Request } from "express";
import path from "path";

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
  }
};

export default fileFilter;
