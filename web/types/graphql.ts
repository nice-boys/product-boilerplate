import { Photon } from "../database/generated/photon";

export interface Context {
  viewerId?: string;
  prisma: Photon;
}
