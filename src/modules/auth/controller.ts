import { Request, Response } from "express";
import { getUserByEmail } from "../user/service";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

export const authenticateHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("USer not found");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.sendStatus(500);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token: token });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const testAuthHandle = async (req: Request, res: Response) => {
  return res.status(200).json({
    auth: "success",
  });
};
