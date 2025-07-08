import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./modules/app-routes";
import mongoose from "mongoose";
import http from "http";
import compression from "compression";
import cookieParser from "cookie-parser";
import { connectDB } from "./Database/dbConfig";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/", router);
app.get("/", (req, res) => {
  res.send("API is running ");
});

app.use(compression());
app.use(cookieParser());

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
