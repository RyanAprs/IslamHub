import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/index";
import deserializeToken from "./middleware/deserializeToken";
import cors from "cors";
// connect to db
import "./utils/connectDB";

const app = express();
const port: number = 3000;

app.use(cors());

const corsOrigin = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.static("uploads"));
app.use(express.static("profileImages"));
app.use(cors(corsOrigin));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeToken);

routes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
