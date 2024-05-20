import { NextFunction, Request, Response } from "express";
import videoModel from "../models/video.model";

export const getAllVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  try {
    const count = await videoModel.countDocuments();
    totalItems = count;

    const totalPages = Math.ceil(Number(totalItems) / Number(perPage));

    const video = await videoModel
      .find()
      .sort({ createdAt: -1 })
      .skip(
        (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
      )
      .limit(parseInt(perPage.toString()));

    if (Array.isArray(video) && video.length > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data video successfully",
        data: video,
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
        total_page: totalPages,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data video successfully",
        data: "No video posted",
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getVideoByTitle = async (q: string) => {
  return await videoModel.find({ title: { $regex: new RegExp(q, "i") } });
};

export const getVideoById = async (id: string) => {
  return await videoModel.findOne({ video_id: id });
};

