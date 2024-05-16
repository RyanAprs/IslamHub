import { NextFunction, Request, Response } from "express";
import {
  getAllBlogs,
  getBlogAndDelete,
  getBlogAndUpdate,
  getBlogById,
  getBlogByTitle,
  getBlogByUserId,
  getBlogImage,
  insertBlog,
} from "../services/blog.service";
import { v4 as uuidv4 } from "uuid";
import { uploadAsync } from "../config/upload.config";
import { getImageForBlog, getName } from "../services/user.service";

export const getBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const q = req.query.query as string;

  if (id) {
    const blog = await getBlogById(id);
    if (blog) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data blog successfully",
        data: blog,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } else if (q) {
    const blog = await getBlogByTitle(q);
    if (blog) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data blog successfully",
        data: blog,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } else {
    return await getAllBlogs(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const getBlogByUser = async (req: Request, res: Response) => {
  const { user_blog_id, user_id } = req.params;

  try {
    await getBlogByUserId(user_blog_id, user_id, req, res);
  } catch (error) {
    return await getAllBlogs(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const getSearchBlog = async (req: Request, res: Response) => {
  const q = req.params.q;

  const blog = await getBlogByTitle(q);
  if (blog) {
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Get data blog ",
      data: blog,
    });
  } else {
    return res.status(404).send({
      status: false,
      status_code: 404,
      message: "Data not found",
      data: {},
    });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    await uploadAsync(req, res);

    const { title, description, user_blog_id } = req.body;
    const blog_id = uuidv4();
    const image = req.file ? req.file.filename : null;

    if (!title || !description || !image || !user_blog_id) {
      return res.status(400).send({
        status: false,
        status_code: 400,
        message: "All fields are required",
      });
    }

    const name = await getName(user_blog_id);
    const user_image = await getImageForBlog(user_blog_id);

    const blogData = {
      blog_id,
      user_blog_id,
      title,
      description,
      author: name,
      user_image,
      image,
    };
    await insertBlog(blogData);
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Blog created successfully",
      data: blogData,
    });
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message || "An error occurred",
      data: {},
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    await uploadAsync(req, res);

    const id = req.params.id;
    const { title, description, author, user_blog_id } = req.body;
    const image = req.file ? req.file.filename : null;

    let imagePrevious;

    if (image) {
      imagePrevious = image;
    } else {
      imagePrevious = await getBlogImage(id);
    }

    if (!title || !description || !author || !user_blog_id) {
      return res.status(400).send({
        status: false,
        status_code: 400,
        message: "All fields are required",
      });
    }

    const blogData = {
      user_blog_id,
      title,
      description,
      author,
      image: imagePrevious,
    };

    const blog = await getBlogAndUpdate(id, blogData);
    if (blog) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Blog updated successfully",
        data: blogData,
      });
    } else {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message || "An error occurred",
      data: {},
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const result = await getBlogAndDelete(postId);
    if (result) {
      res.status(200).json({
        status: true,
        status_code: 200,
        message: "Delete blog successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};
