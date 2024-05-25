import { Router } from "express";
import {
  countCommunity,
  countUser,
} from "../controllers/dashboardAdmin.controller";

export const DashboardAdminRouter: Router = Router();

DashboardAdminRouter.get("/count-user", countUser);
DashboardAdminRouter.get("/count-community", countCommunity);
