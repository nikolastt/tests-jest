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
  it("Should be possible to create a new user", async () => {
    const response = await request(app).post("/api/user").send(userData);

    expect(response.status).toBe(200);
  });
});

describe("get users", () => {
  it("Should return a status of 200 when fetching users", async () => {
    await createUser(userData.email, userData.name, userData.password);
    const response = await request(app).get("/api/user");

    expect(response.status).toBe(200);
  });

  it("Should return an error if there are no users", async () => {
    const response = await request(app).get("/api/user");

    expect(response.status).toBe(500);
    expect(response.body).toBe("Users not avaliable");
  });
});

describe("create user", () => {
  it("Should return an error if you try to create a user with the same email", async () => {
    await createUser(userData.email, userData.name, userData.password);
    const response = await request(app).post("/api/user").send(userData);

    expect(response.status).toBe(500);
  });
});

describe("delete user", () => {
  it("Must return success when deleting a user", async () => {
    await createUser(userData.email, userData.name, userData.password);

    const resposne = await request(app)
      .delete("/api/user")
      .send({ email: userData.email });

    expect(resposne.status).toBe(200);
  });

  it("Should return an error if the user does not exist when trying to delete", async () => {
    const response = await request(app)
      .delete("/api/user")
      .send({ email: "emailnotexists" });

    expect(response.body).toBe("User not exists");
  });
});

describe("Edit user", () => {
  it("Must return success when deleting a user", async () => {
    const user = await createUser(
      userData.email,
      userData.name,
      userData.password
    );

    const resposne = await request(app)
      .post("/api/user/edit")
      .send({ ...user, name: "Edit name" });

    expect(resposne.status).toBe(200);
    expect(resposne.body.name).toBe("Edit name");
  });

  it("Must return success when deleting a user", async () => {
    await createUser(userData.email, userData.name, userData.password);

    const resposne = await request(app).post("/api/user/edit").send(userData);

    expect(resposne.status).toBe(500);
  });
});
