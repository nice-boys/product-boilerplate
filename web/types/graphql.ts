import { Prisma } from "../database/generated/client";

export interface Context {
  viewerId?: string;
  prisma: Prisma;
}
