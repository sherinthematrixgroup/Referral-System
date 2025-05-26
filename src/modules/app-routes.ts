// src/modules/app-routes.ts
import { Router } from "express";
import { userRoutes } from "./Users/userRoutes";
import { referralRoutes } from "./referrals/referralRoutes";
// import mongoose from "mongoose";
// import express from "express";

export const router = Router();

router.use("/users", userRoutes);
router.use("/referrals", referralRoutes);

// const app = express();

// const start = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://yaminisherin25:HYihbkQzq81WQfl0@cluster.mxqaoci.mongodb.net/"); // MongoDB connection here
//     console.log("Connected to MongoDB");

//     app.listen(5000, () => {
//       console.log("Listening on port 5000"); // Server starts
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// start();
