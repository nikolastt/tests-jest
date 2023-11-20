import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Data {
  id: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("unauthorized");
    }

    const token = authorization.replace("Bearer", "").trim();

    const data = jwt.verify(token, process.env.JWT_SECRET as string);

    const { id } = data as Data;

    if (id) {
      return next();
    }
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};

export default authMiddleware;
