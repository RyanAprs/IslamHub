import { Router } from "express";
import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  updateCommunity,
} from "../controllers/community.controller";

export const CommunityRoute: Router = Router();

CommunityRoute.get("/", getCommunities);
CommunityRoute.get("/:id", getCommunities);
CommunityRoute.post("/", createCommunity);
CommunityRoute.put("/:id", updateCommunity);
CommunityRoute.delete("/:id", deleteCommunity);
