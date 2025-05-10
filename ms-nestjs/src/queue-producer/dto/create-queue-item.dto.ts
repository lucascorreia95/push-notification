import { NotificationsType } from 'generated/prisma';

export class CreateQueueItem {
  userID: string;
  title: string;
  type: NotificationsType;
  message?: string;
}
