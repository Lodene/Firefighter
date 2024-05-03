import { PrismaClient } from "@prisma/client";
import { Event, Sensor } from "./types";


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

