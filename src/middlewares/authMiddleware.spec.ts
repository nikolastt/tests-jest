import { app } from "../app";
import { prisma } from "../database/prisma";
import { createUser } from "../modules/user/service";

import request from "supertest";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

const userData = {
  email: "nikolasbitencourt@gmail.com",
  name: "nikolas",
  password: "teste",
};

describe("Verify auth", () => {
  it("Shoud be a 200 code must be returned if authenticated", async () => {
    await createUser(userData.email, userData.name, userData.password);

    const responseToken = await request(app).post("/api/auth").send(userData);

    const response = await request(app)
      .get("/api/auth/test")
      .set("Authorization", `Bearer ${responseToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth");
  });

  it("Shoud be a code of 500 must be returned, if there is no header", async () => {
    const response = await request(app).get("/api/auth/test");

    expect(response.status).toBe(500);
  });
});
