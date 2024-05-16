import { Request, Response } from "express";
import {
  getAllGroupChat,
  getGroupChatById,
} from "../services/groupChat.service";

export const getGroupChats = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id) {
    const groupChat = await getGroupChatById(id);
    if (groupChat) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data group chat successfully",
        data: groupChat,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "No group chat posted",
        data: {},
      });
    }
  } else {
    try {
      const groupChats = await getAllGroupChat();
      if (Array.isArray(groupChats) && groupChats.length > 0) {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "Get data group chat success",
          data: groupChats,
        });
      } else {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "No group chat posted",
          data: {},
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        status_code: 500,
        message: "Internal Server Error",
        data: {},
      });
    }
  }
};
