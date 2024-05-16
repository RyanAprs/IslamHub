import { Application, Router } from "express";
import { Blogrouter } from "./blog.route";
import { AuthRouter } from "./auth.route";
import { UserRouter } from "./user.route";
import { ChatRoute } from "./chat.route";
import { GroupChatRoute } from "./groupChat.route";

const routesList: Array<[string, Router]> = [
  ["/api/v1/blog", Blogrouter],
  ["/api/v1/auth", AuthRouter],
  ["/api/v1/user", UserRouter],
  ["/api/v1/chat", ChatRoute],
  ["/api/v1/group-chat", GroupChatRoute],
];

export const routes = (app: Application) => {
  routesList.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
