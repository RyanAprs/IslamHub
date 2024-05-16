import { Router } from "express";
import { getGroupChats } from "../controllers/groupChat.controller";

export const GroupChatRoute: Router = Router();

GroupChatRoute.get("/", getGroupChats);
GroupChatRoute.get("/:id");
GroupChatRoute.post("/");
GroupChatRoute.delete("/:id");
