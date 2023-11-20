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
  it("Shoud be return all products", async () => {
    await createProduct(productMock as Product);

    const response = await request(app).get("/api/product");
    expect(response.status).toBe(200);
  });

  it("Shoud be return an error if dont have a product", async () => {
    const response = await request(app).get("/api/product");

    expect(response.status).toBe(500);
    expect(response.body).toBe("Not products avaliable");
  });
});

describe("Create product", () => {
  it("Shoud be can create a product", async () => {
    const response = await request(app).post("/api/product").send(productMock);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Shoud be return an error if create a product an the same name", async () => {
    await createProduct(productMock as Product);

    const response = await request(app).post("/api/product").send(productMock);

    expect(response.status).toBe(500);
  });
});

describe("Delete product", () => {
  it("Shoud be can delete a product", async () => {
    const product = await createProduct(productMock as Product);

    const response = await request(app).delete("/api/product").send({
      id: product.id,
    });

    expect(response.status).toBe(200);
  });

  it("Shoud be return an error if delete a product and not has a product", async () => {
    const response = await request(app).delete("/api/product").send({
      id: "id error",
    });

    expect(response.status).toBe(500);
  });
});
