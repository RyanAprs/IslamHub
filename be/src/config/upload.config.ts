import multer from "multer";
import fileFilter from "./fileFilter.config";
import { promisify } from "util";
import { profileStorage, storage } from "./storage.config";

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

const profileUpload = multer({
  storage: profileStorage,
  fileFilter: fileFilter,
}).single("image");

const uploadAsync = promisify(upload);
const profileUploadAsync = promisify(profileUpload);

export { uploadAsync, profileUploadAsync };
