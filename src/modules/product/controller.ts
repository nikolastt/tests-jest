import { Request, Response } from "express";
import {
  createProduct,
  deleteProductById,
  editProduct,
  getProducts,
} from "./service";
import { Product } from "@prisma/client";

export const productHandler = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();

    if (products.length <= 0) {
      throw new Error("Not products avaliable");
    }

    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json((err as any).message);
  }
};

export const createProductHandle = async (req: Request, res: Response) => {
  const product = req.body as Product;

  try {
    const productResponse = await createProduct(product);

    return res.status(200).json(productResponse);
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};

export const deleteProductHandle = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await deleteProductById(id);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const editProductHandle = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    if (!data.id) {
      throw new Error("Id not found");
    }
    const productEdit = await editProduct(data);

    return res.status(200).json(productEdit);
  } catch (err) {
    return res.status(500).json((err as any).message);
  }
};
