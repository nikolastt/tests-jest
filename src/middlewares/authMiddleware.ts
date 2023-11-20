import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Data {
  id: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const data = jwt.verify(token, process.env.JWT_SECRET as string);

    const { id } = data as Data;

    if (id) {
      return next();
    }
  } catch {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
