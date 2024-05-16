import { Router } from "express";
import {
  createGroupChat,
  getGroupChats,
} from "../controllers/groupChat.controller";

export const GroupChatRoute: Router = Router();

GroupChatRoute.get("/", getGroupChats);
GroupChatRoute.get("/:id", getGroupChats);
GroupChatRoute.post("/", createGroupChat);
GroupChatRoute.delete("/:id");
