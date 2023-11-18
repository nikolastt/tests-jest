import { Request, Response } from "express";
import { createUser, getUsers } from "./service";

export const userHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const createUserHandle = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    const user = await createUser(email, name, password);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
