import { prisma } from "./database/generated/client";

export interface Context {
  prisma: typeof prisma;
  viewerId?: string;
}
