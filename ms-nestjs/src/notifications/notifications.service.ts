import { Injectable } from '@nestjs/common';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from 'generated/prisma';
import { QueueProducerService } from 'src/queue-producer/queue-producer.service';

@Injectable()
export class NotificationsService {
  constructor(
    private prismaService: PrismaService,
    private queueProducerService: QueueProducerService,
  ) {}

  async create(createNotificationDTO: CreateNotificationDTO, user: Users) {
    const notification = await this.prismaService.notification.create({
      data: {
        userId: user.id,
        title: createNotificationDTO.title,
        type: createNotificationDTO.type,
        message: createNotificationDTO.message || '',
      },
    });

    if (!notification) throw new Error('erro saving the notification');

    this.queueProducerService.create({
      ...createNotificationDTO,
      userID: user.id,
    });

    return;
  }
}
