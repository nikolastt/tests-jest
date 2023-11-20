import { Product } from "@prisma/client";
import { prisma } from "../../database/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

export const createProduct = async (product: Product) => {
  const response = await prisma.product.create({
    data: {
      amount: product.amount,
      description: product.description,
      name: product.name,
    },
  });

  return response;
};

export const deleteProductById = async (id: string) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};
