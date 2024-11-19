import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};


const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Prisma Middleware to filter out deleted users
// 왜 deprecated가 뜨는지 모르겠으나 공식문서에 나온 식이라 문제없을듯함
prisma.$use(async (params, next) => {
  if (params.model === 'User' && ['findMany', 'findUnique', 'findFirst'].includes(params.action)) {
    if (!params.args.where) {
      params.args.where = {};
    }
    params.args.where['isDeleted'] = false;
  }

  return next(params);
});


export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
