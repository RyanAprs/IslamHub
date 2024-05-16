import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChats,
  getChatByGroup,
} from "../controllers/chat.controller"

export const ChatRoute: Router = Router();

ChatRoute.get("/", getChats);
ChatRoute.get("/:group_id", getChatByGroup);
ChatRoute.post("/", createChat);
ChatRoute.delete("/:id", deleteChat);
