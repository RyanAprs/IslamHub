import { Router } from "express";

import { requireUser } from "../middleware/auth";

export const VideoRouter: Router = Router();

VideoRouter.get("/", );
VideoRouter.get("/search", );
VideoRouter.get("/:id", );
VideoRouter.get("/:user_id/:user_video_id", );
VideoRouter.post("/", );
VideoRouter.put("/:id", );
VideoRouter.delete("/:id", );
