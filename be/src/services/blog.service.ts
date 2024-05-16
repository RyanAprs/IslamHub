import { Request, Response, NextFunction } from "express";
import blogModel from "../models/blog.model";
import removeImage from "../config/removeImage.config";
import authModel from "../models/auth.model";

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  try {
    const count = await blogModel.countDocuments();
    totalItems = count;

    const totalPages = Math.ceil(Number(totalItems) / Number(perPage));

    const blogs = await blogModel
      .find()
      .skip(
        (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
      )
      .limit(parseInt(perPage.toString()));

    if (Array.isArray(blogs) && blogs.length > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data blogs successfully",
        data: blogs,
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
        total_page: totalPages,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data blogs successfully",
        data: "No blogs posted",
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlogById = async (id: string) => {
  return await blogModel.findOne({ blog_id: id });
};

export const getBlogByTitle = async (q: string) => {
  return await blogModel.find({ title: { $regex: new RegExp(q, "i") } });
};

export const insertBlog = async (payload: any) => {
  return await blogModel.create(payload);
};

export const getBlogAndUpdate = async (id: string, payload: any) => {
  return await blogModel.findOneAndUpdate(
    {
      blog_id: id,
    },
    {
      $set: payload,
    }
  );
};

export const getBlogByUserId = async (
  user_blog_id: string,
  user_id: string,
  req: Request,
  res: Response
) => {
  try {
    const idUserBlog = await blogModel.findOne({ user_blog_id: user_blog_id });
    const idUser = await authModel.findOne({ user_id: user_id });

    // Jika user_id dan user_blog_id tidak sama, ambil blog berdasarkan user_blog_id saja
    if (idUser && idUserBlog && idUserBlog.user_blog_id === user_blog_id) {
      const currentPage = req.query.page || 1;
      const perPage = req.query.perPage || 5;

      const count = await blogModel.countDocuments({
        user_blog_id: user_blog_id,
      });
      const totalItems = count;

      const totalPages = Math.ceil(Number(totalItems) / Number(perPage));

      const blogs = await blogModel
        .find({ user_blog_id: user_blog_id })
        .skip(
          (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
        )
        .limit(parseInt(perPage.toString()));

      if (blogs.length > 0) {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: blogs,
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
          total_page: totalPages,
        });
      } else {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: "No blogs posted",
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
        });
      }
    } else {
      // Jika user_id dan user_blog_id tidak sama, tambahkan fitur API untuk mengambil berdasarkan user_blog_id saja
      const currentPage = req.query.page || 1;
      const perPage = req.query.perPage || 5;

      const count = await blogModel.countDocuments({
        user_blog_id: user_blog_id,
      });
      const totalItems = count;

      const blogs = await blogModel
        .find({ user_blog_id: user_blog_id })
        .skip(
          (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
        )
        .limit(parseInt(perPage.toString()));

      if (blogs.length > 0) {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: blogs,
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
        });
      } else {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: "No blogs posted",
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlogAndDelete = async (id: string) => {
  try {
    const blog = await blogModel.findOne({ blog_id: id });
    if (!blog) {
      const error = new Error("Data not found");
      throw error;
    }

    removeImage(blog.image);
    const result = await blogModel.findOneAndDelete({ blog_id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBlogImage = async (id: string) => {
  const blog = await blogModel.findOne({ id });
  const blogImage = blog?.image;
  return blogImage;
};

export const getBlogId = async (id: string) => {
  const blog = await blogModel.findOne({ id });
  const blogId = blog?.blog_id;
  return blogId;
};

