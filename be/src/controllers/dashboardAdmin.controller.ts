import { Request, Response } from "express";
import {
  getCounCommunity,
  getCountUser,
  getCountVideo,
} from "../services/dashboardAdmin.service";

export const countUser = async (req: Request, res: Response) => {
  return await getCountUser(req, res);
};

export const countCommunity = async (req: Request, res: Response) => {
  return await getCounCommunity(req, res);
};

export const countVideo = async (req: Request, res: Response) => {
  return await getCountVideo(req, res);
};
