const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      password: "hashedpassword123",
    },
  });

  console.log("User created:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
