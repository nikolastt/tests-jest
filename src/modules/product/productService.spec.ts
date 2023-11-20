import { Product } from "@prisma/client";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
} from "./service";
import { prisma } from "../../database/prisma";

const productMock: Partial<Product> = {
  amount: 25,
  description: "Celular muito bom",
  name: "Samsung",
};

beforeEach(async () => {
  await prisma.product.deleteMany();
});

describe("Get Product", () => {
  it("shoud be return all products", async () => {
    await createProduct(productMock as Product);

    const products = await getProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("id");
  });

  it("Shoud be return a product with a specific id", async () => {
    const productResponse = await createProduct(productMock as Product);

    const product = await getProductById(productResponse.id);

    expect(product?.id).toBe(productResponse.id);
  });
});

describe("Create Product", () => {
  it("Shoud be can create a product", async () => {
    const response = await createProduct(productMock as Product);

    expect(response).toHaveProperty("id");
  });
});

describe("Delete Product", () => {
  it("Shoud be can delete a product", async () => {
    const product = await createProduct(productMock as Product);
    await deleteProductById(product.id);

    const productResponse = await getProductById(product.id);

    expect(productResponse).toBe(null);
  });
});
