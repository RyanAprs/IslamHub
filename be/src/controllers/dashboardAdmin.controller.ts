import { Request, Response } from "express";
import { getCountUser } from "../services/dashboardAdmin.service";

export const countUser = async (req: Request, res: Response) => {
  return await getCountUser(req, res);
};
