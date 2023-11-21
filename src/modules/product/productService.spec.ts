import { Product } from "@prisma/client";
import {
  createProduct,
  deleteProductById,
  editProduct,
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
  it("Must be possible to return a product", async () => {
    await createProduct(productMock as Product);

    const products = await getProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("id");
  });

  it("Must be possible to return a product of a given id", async () => {
    const productResponse = await createProduct(productMock as Product);

    const product = await getProductById(productResponse.id);

    expect(product?.id).toBe(productResponse.id);
  });
});

describe("Create Product", () => {
  it("Must be possible to create a product", async () => {
    const response = await createProduct(productMock as Product);

    expect(response).toHaveProperty("id");
  });
});

describe("Delete Product", () => {
  it("Must be possible to delete a product", async () => {
    const product = await createProduct(productMock as Product);
    await deleteProductById(product.id);

    const productResponse = await getProductById(product.id);

    expect(productResponse).toBe(null);
  });
});

describe("Edite Product", () => {
  it("Edit success product", async () => {
    const product = await createProduct(productMock as Product);
    const userEdit = await editProduct({ ...product, name: "Edit name" });

    expect(userEdit.name).toBe("Edit name");
  });
});
