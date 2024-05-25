import { Request, Response } from "express";
import authModel from "../models/auth.model";

export const getCountUser = async (req: Request, res: Response) => {
  try {
    const totalUser = await authModel.countDocuments();

    if (Array.isArray(totalUser) && totalUser.length > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data users successfully",
        total_data: totalUser,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data users successfully",
        data: "No user posted",
        total_data: totalUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
