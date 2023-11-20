import { app } from "../../app";
import { prisma } from "../../database/prisma";
import { createUser } from "../user/service";
import request from "supertest";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

const userData = {
  email: "nikolasbitencourt@gmail.com",
  name: "nikolas",
  password: "teste",
};

describe("Get a token", () => {
  it("Must return a valid token", async () => {
    await createUser(userData.email, userData.name, userData.password);

    const responseToken = await request(app).post("/api/auth").send(userData);

    expect(responseToken.status).toBe(200);
    expect(responseToken.body).toHaveProperty("token");
  });

  it("Should return an error if the password is incorrect", async () => {
    await createUser(userData.email, userData.name, "incorrect password");

    const responseToken = await request(app).post("/api/auth").send(userData);

    expect(responseToken.status).toBe(500);
  });

  it("Should return an error if it doesn't find a user", async () => {
    const responseToken = await request(app).post("/api/auth").send(userData);

    expect(responseToken.status).toBe(500);
  });
});
