import { Request, Response } from "express";
import {
  getAllGroupChat,
  getGroupChatById,
  insertGroupChat,
} from "../services/groupChat.service";
import { v4 as uuidv4 } from "uuid";

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

export const createGroupChat = async (req: Request, res: Response) => {
  const group_id = uuidv4();
  const { user_id, title, name } = req.body;
  const image = null;

  if (!title || !title || !name) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "All fields are required",
    });
  }

  const groupChatData = {
    group_id,
    user_id,
    title,
    image,
    name,
  };

  try {
    await insertGroupChat(groupChatData);
    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "created chat successfully",
      data: groupChatData,
    });
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};
