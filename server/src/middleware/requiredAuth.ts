import { Request, Response, NextFunction } from "express";
import { accessTokenSecret } from "../config";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, accessTokenSecret!, (err, user) => {
    if (err) return res.sendStatus(403);
    //.locals save the state and pass it to the next function/middleware
    res.locals.jwt = user;
    next();
  });
};
