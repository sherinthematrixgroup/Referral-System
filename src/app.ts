import express from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import cors from "cors";
import { router } from "./modules/app-routes";
import mongoose from "mongoose";
import http from "http";
import compression from "compression";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(
  cors({
    Credentials: true,
  }),
);
app.use(json());

app.use("/", router);
app.get("/", (req, res) => {
  res.send("API is running ");
});

app.use(compression());
app.use(cookieParser());
const server = http.createServer(app);
server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

const MONGO_URL = process.env.MONGODB_URI;
if (!MONGO_URL) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
