import { Request, Response } from "express";
import {
  createUser,
  deleteUSerByEmail,
  editUser,
  getUserByEmail,
  getUsers,
} from "./service";

export const userHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (users.length <= 0) {
      throw new Error("Users not avaliable");
    }

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};

export const createUserHandle = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    const user = await createUser(email, name, password);

    return res.status(200).json(user);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const deleteUserHandle = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("User not exists");
    }

    await deleteUSerByEmail(email);

    return res.sendStatus(200);
  } catch (err) {
    return res
      .status(500)
      .json((err as unknown as { message: string }).message);
  }
};

export const editUserHandle = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    if (!data.id) {
      throw new Error("Id not found");
    }
    const userEdit = await editUser(data);

    return res.status(200).json(userEdit);
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};
