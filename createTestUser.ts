import { prisma } from '@/lib/prisma';

async function createTestUser() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });
  console.log("Usuário criado:", user);
}

createTestUser()
  .then(() => {
    console.log("Usuário de teste criado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao criar o usuário de teste:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
