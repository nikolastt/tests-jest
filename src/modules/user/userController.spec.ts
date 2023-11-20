import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../database/prisma";
import { createUser } from "./service";

const userData = {
  email: "nikolasbitencourt@gmail.com",
  name: "nikolas",
  password: "teste",
};

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("Create user Controller", () => {
  it("shoud be able to create a new user", async () => {
    const response = await request(app).post("/api/user").send(userData);

    expect(response.status).toBe(200);
  });
});

describe("get users", () => {
  it("Shoud be a resposne status 200", async () => {
    await createUser(userData.email, userData.name, userData.password);
    const response = await request(app).get("/api/user");

    expect(response.status).toBe(200);
  });

  it("Shoud be return an error if dont have a user", async () => {
    const response = await request(app).get("/api/user");

    expect(response.status).toBe(500);
    expect(response.body).toBe("Users not avaliable");
  });
});

describe("create user", () => {
  it("Return error if try create a user two many times", async () => {
    await createUser(userData.email, userData.name, userData.password);
    const response = await request(app).post("/api/user").send(userData);

    expect(response.status).toBe(500);
  });
});

describe("delete user", () => {
  it("Return success to delete a user", async () => {
    await createUser(userData.email, userData.name, userData.password);

    const resposne = await request(app)
      .delete("/api/user")
      .send({ email: userData.email });

    expect(resposne.status).toBe(200);
  });

  it("Return an error if user not exists", async () => {
    const response = await request(app)
      .delete("/api/user")
      .send({ email: "emailnotexists" });

    expect(response.body).toBe("User not exists");
  });
});
