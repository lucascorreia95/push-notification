import { Injectable } from '@nestjs/common';
import { CreateQueueItem } from './dto/create-queue-item.dto';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueProducerService {
  constructor(
    private rabbitmqService: RabbitMqService,
    private configService: ConfigService,
  ) {}

  async create(createQueueItem: CreateQueueItem) {
    const queueNmae = await this.configService.get<string>('QUEUE_NAME');

    if (!queueNmae) throw new Error('error getting the queue name');

    this.rabbitmqService.publish(queueNmae, createQueueItem);

    return;
  }
}
