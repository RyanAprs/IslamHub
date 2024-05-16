import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      unique: true,
    },
    user_blog_id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
    },
    user_image: {
      type: String
    }
  },
  { timestamps: true, _id: true }
);

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;
