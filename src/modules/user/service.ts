import { Prisma } from "@prisma/client";
import { prisma } from "../../database/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  return user;
};
