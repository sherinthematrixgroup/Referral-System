import { Request, Response, NextFunction } from "express";

export const errorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(400).send({ message: err.message });
};
