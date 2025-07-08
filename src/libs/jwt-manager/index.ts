import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { StringValue } from "ms"; // from 'ms' types used in jsonwebtoken

export const generateAccessToken = (userId: string): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("ACCESS_TOKEN_SECRET is not defined");

  const expiresIn = (process.env.ACCESS_TOKEN_EXPIRY || "15m") as StringValue;

  return jwt.sign({ userId }, secret as Secret, { expiresIn });
};

export const generateRefreshToken = (userId: string): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error("REFRESH_TOKEN_SECRET is not defined");

  const expiresIn = (process.env.REFRESH_TOKEN_EXPIRY || "7d") as StringValue;

  return jwt.sign({ userId }, secret as Secret, { expiresIn });
};
