import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import stageRoutes from "./routes/stage.routes.js";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Importing routes
app.use("/api/auth", authRoutes);
app.use("/api/stages", stageRoutes);
app.use("/api/applications", applicationRoutes);

// http://localhost:8000/api/auth/register

// Router declaration
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Exporting app
export { app };
