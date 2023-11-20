import { prisma } from "../../database/prisma";
import { createUser, deleteUSerByEmail, getUserByEmail } from "./service";

const userData = {
  name: "nikolas",
  email: "nikolasbitencourt@gmail.com",
  password: "teste",
};

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

  // it("Não deve ser possível criar dois usuários com o mesmo e-mail", async () => {
  //   const user = await createUser(
  //     userData.email,
  //     userData.name,
  //     userData.password
  //   );

  //   expect(
  //     await createUser(userData.email, userData.name, userData.password)
  //   ).rejects.toMatch("PrismaClientKnownRequestError");

  //   await prisma.user.delete({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  // });
});

describe("Delete User", () => {
  it("Delete success user", async () => {
    await createUser(userData.email, userData.name, userData.password);

    await deleteUSerByEmail(userData.email);

    const user = await getUserByEmail(userData.email);

    expect(user).toBe(null);
  });
});
