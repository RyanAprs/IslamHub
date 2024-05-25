import { Request, Response } from "express";
import authModel from "../models/auth.model";
import communityModel from "../models/community.model";
import videoModel from "../models/video.model";

export const getCountUser = async (req: Request, res: Response) => {
  try {
    const totalUser = await authModel.countDocuments();

    if (totalUser > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data user successfully",
        total_data: totalUser,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data user successfully",
        data: "No user posted",
        total_data: totalUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCounCommunity = async (req: Request, res: Response) => {
  try {
    const totalCommunity = await communityModel.countDocuments();

    if (totalCommunity > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data community successfully",
        total_data: totalCommunity,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data community successfully",
        data: "No community posted",
        total_data: totalCommunity,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCountVideo = async (req: Request, res: Response) => {
  try {
    const totalVideo = await videoModel.countDocuments();

    if (totalVideo > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data video successfully",
        total_data: totalVideo,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data video successfully",
        data: "No video posted",
        total_data: totalVideo,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
