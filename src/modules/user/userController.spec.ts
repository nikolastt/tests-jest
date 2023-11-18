import { Response } from "express";
import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../database/prisma";
import { createUser } from "./service";

const userData = {
  email: "nikolasbitencourt@gmail.com",
  name: "nikolas",
  password: "teste",
};

describe("Create user Controller", () => {
  it("shoud be able to create a new user", async () => {
    const response = await request(app).post("/api/user").send(userData);

    expect(response.status).toBe(200);

    await prisma.user.delete({
      where: {
        id: response.body.id,
      },
    });
  });
});

describe("get users", () => {
  it("Shoud be a resposne status 200", async () => {
    const response = await request(app).get("/api/user");

    expect(response.status).toBe(200);
  });

  it("Shoud be a error an send a method errado", async () => {
    const response = await request(app).post("/api/user");

    expect(response.status).toBe(500);
  });
});

describe("create user", () => {
  it("Return error if try create a user two many times", async () => {
    await createUser(userData.email, userData.name, userData.password);
    const response = await request(app).post("/api/user").send(userData);

    expect(response.status).toBe(500);

    await prisma.user.delete({
      where: {
        email: userData.email,
      },
    });
  });
});
