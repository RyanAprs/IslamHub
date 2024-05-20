import { Request, Response } from "express";
import { getAllVideo, getVideoById, getVideoByTitle } from "../services/video.service";

export const getVideo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const q = req.query.query as string;

  if (id) {
    const blog = await getVideoById(id);
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
    const blog = await getVideoByTitle(q);
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
    return await getAllVideo(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};
