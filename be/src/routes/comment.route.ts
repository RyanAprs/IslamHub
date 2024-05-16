import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentByBlog,
  getComments,
} from "../controllers/comment.controller";

export const CommentRouter: Router = Router();

CommentRouter.get("/", getComments);
CommentRouter.get("/:blog_id", getCommentByBlog);
CommentRouter.post("/", createComment);
CommentRouter.delete("/:id", deleteComment);
