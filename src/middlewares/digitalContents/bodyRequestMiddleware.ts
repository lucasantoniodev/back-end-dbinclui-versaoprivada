import { NextFunction, Request, Response } from "express";

export const bodyRequestMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    req.body = JSON.parse(req.body.data);
  } catch (error) {
    console.log(error);
  }

  next();
};
