import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChats,
  getChatByCommunity,
} from "../controllers/chat.controller"

export const ChatRoute: Router = Router();

ChatRoute.get("/", getChats);
ChatRoute.get("/:community_id", getChatByCommunity);
ChatRoute.post("/", createChat);
ChatRoute.delete("/:id", deleteChat);
