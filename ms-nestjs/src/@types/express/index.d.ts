import { Users } from 'generated/prisma';

declare module 'express' {
  interface Request {
    user?: Users;
  }
}
