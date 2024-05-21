import { Request, Response } from "express";
import {
  getAllVideo,
  getVideoById,
  getVideoByTitle,
  getVideoByUserId,
} from "../services/video.service";

export const getVideo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const q = req.query.query as string;

  if (id) {
    const video = await getVideoById(id);
    if (video) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data video successfully",
        data: video,
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
    const video = await getVideoByTitle(q);
    if (video) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get search data video successfully",
        data: video,
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
    return await getAllVideo(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const getVideoByUser = async (req: Request, res: Response) => {
  const { user_video_id, user_id } = req.params;

  try {
    const video = await getVideoByUserId(user_video_id, user_id);
    if (Array.isArray(video) && video.length > 0) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get data chat success",
        data: video,
      });
    } else {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "No chat posted",
        data: {},
      });
    }
  } catch (error) {
    return await getAllVideo(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const createVideo = async (req: Request, res: Response) => {};
