import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/index";
import deserializeToken from "./middleware/deserializeToken";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// connect to db
import "./utils/connectDB";

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Add your authentication middleware if needed
app.use(deserializeToken);

// Set up WebSocket server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

io.on("connection", (socket: any) => {
  console.log("Socket connected: " + socket.id);
  socket.on("send_message", (data: any) => {
    socket.broadcast.emit("receive_message", data);
  });
});

// Define your API routes
routes(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
