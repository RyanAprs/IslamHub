import { Router } from "express";
import {
  createCommunity,
  deleteCommunity,
  getCommunities,
} from "../controllers/community.controller";

export const CommunityRoute: Router = Router();

CommunityRoute.get("/", getCommunities);
CommunityRoute.get("/:id", getCommunities);
CommunityRoute.post("/", createCommunity);
CommunityRoute.delete("/:id", deleteCommunity);
