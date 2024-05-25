import { Router } from "express";
import { countUser } from "../controllers/dashboardAdmin.controller";

export const DashboardAdminRouter: Router = Router();

DashboardAdminRouter.get("/count-user", countUser);
