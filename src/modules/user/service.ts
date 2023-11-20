import bcrypt from "bcrypt";
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
  const hashedPass = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPass,
    },
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

export const deleteUSerByEmail = async (email: string) => {
  await prisma.user.delete({
    where: {
      email,
    },
  });

  return;
};
