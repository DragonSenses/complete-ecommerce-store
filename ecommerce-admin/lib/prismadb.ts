import { PrismaClient } from "@prisma/client";

// Add prisma to globalThis (to prevent any type warning on variable prisma)
declare global {
  var prisma: PrismaClient | undefined
};

// Set prismadb to globalThis prisma instance or create a new instance of PrismaClient
const prismadb = globalThis.prisma || new PrismaClient();

// Check if environment is in production, then set globalThis
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;