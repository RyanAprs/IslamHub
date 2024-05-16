import path from "path";
import fs from "fs";

const removeImage = (filePath: any) => {
  console.log("file path", filePath);
  console.log("dir name: ", __dirname);

  filePath = path.join(__dirname, "../../uploads", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

export default removeImage;
