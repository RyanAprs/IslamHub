import { Application, Router } from "express";
import { Blogrouter } from "./blog.route";
import { AuthRouter } from "./auth.route";
import { UserRouter } from "./user.route";
import { ChatRouter } from "./chat.route";
import { CommunityRouter } from "./community.route";
import { VideoRouter } from "./video.route";

const routesList: Array<[string, Router]> = [
  ["/api/v1/blog", Blogrouter],
  ["/api/v1/auth", AuthRouter],
  ["/api/v1/user", UserRouter],
  ["/api/v1/chat", ChatRouter],
  ["/api/v1/community", CommunityRouter],
  ["/api/v1/video", VideoRouter],
];

export const routes = (app: Application) => {
  routesList.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
