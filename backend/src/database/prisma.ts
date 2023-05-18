import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

function getPrismaInstance(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export { getPrismaInstance };
