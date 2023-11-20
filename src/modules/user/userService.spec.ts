import { prisma } from "../../database/prisma";
import { createUser, deleteUSerByEmail, getUserByEmail } from "./service";

const userData = {
  name: "nikolas",
  email: "nikolasbitencourt@gmail.com",
  password: "teste",
};

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("Create user", () => {
  it("Deve ser possivel criar um usuário", async () => {
    const user = await createUser(
      userData.email,
      userData.name,
      userData.password
    );

    expect(user).toHaveProperty("id");

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  });
});

describe("Delete User", () => {
  it("Delete success user", async () => {
    await createUser(userData.email, userData.name, userData.password);

    await deleteUSerByEmail(userData.email);

    const user = await getUserByEmail(userData.email);

    expect(user).toBe(null);
  });
});
