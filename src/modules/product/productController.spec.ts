import { Product } from "@prisma/client";
import { createProduct } from "./service";
import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../database/prisma";

const productMock: Partial<Product> = {
  amount: 25,
  description: "Celular muito bom",
  name: "Samsung",
};

beforeEach(async () => {
  await prisma.product.deleteMany();
});

describe("Get products", () => {
  it("Must return all products", async () => {
    await createProduct(productMock as Product);

    const response = await request(app).get("/api/product");
    expect(response.status).toBe(200);
  });

  it("Should return an error if it doesn't find a product", async () => {
    const response = await request(app).get("/api/product");

    expect(response.status).toBe(500);
    expect(response.body).toBe("Not products avaliable");
  });
});

describe("Create product", () => {
  it("Must be possible to create a product", async () => {
    const response = await request(app).post("/api/product").send(productMock);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should return an error if creating an existing product", async () => {
    await createProduct(productMock as Product);

    const response = await request(app).post("/api/product").send(productMock);

    expect(response.status).toBe(500);
  });
});

describe("Delete product", () => {
  it("Must be possible to delete a product", async () => {
    const product = await createProduct(productMock as Product);

    const response = await request(app).delete("/api/product").send({
      id: product.id,
    });

    expect(response.status).toBe(200);
  });

  it("Must be possible to return an error if when deleting a product it does not exist", async () => {
    const response = await request(app).delete("/api/product").send({
      id: "id error",
    });

    expect(response.status).toBe(500);
  });
});

describe("Edit product", () => {
  it("Must return success when deleting a product", async () => {
    const product = await createProduct(productMock as Product);

    const resposne = await request(app)
      .post("/api/product/edit")
      .send({ ...product, name: "Edit name" });

    expect(resposne.status).toBe(200);
    expect(resposne.body.name).toBe("Edit name");
  });

  it("Must return success when deleting a user", async () => {
    await createProduct(productMock as Product);

    const resposne = await request(app)
      .post("/api/product/edit")
      .send(productMock);

    expect(resposne.status).toBe(500);
  });
});
