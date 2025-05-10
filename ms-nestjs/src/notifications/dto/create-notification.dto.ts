import { NotificationsType } from 'generated/prisma';

export class CreateNotificationDTO {
  title: string;
  message?: string;
  type: NotificationsType;
}
