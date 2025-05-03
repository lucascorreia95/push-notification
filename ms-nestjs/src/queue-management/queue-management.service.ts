import { Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class QueueManagementService {
  constructor(
    private readonly rabbitmqService: RabbitMqService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(payload: {
    queueName: string;
    userName: string;
  }) {
    try {
      await this.rabbitmqService.assertQueue(payload.queueName, {
        durable: true,
      });
      console.log(
        `Queue '${payload.queueName}' created for the user ${payload.userName} (via event).`,
      );

      this.eventEmitter.emit('queue.created', { queueName: payload.queueName });
    } catch (error) {
      console.error(
        `Error creating queue '${payload.queueName}' for the user ${payload.userName}:`,
        error,
      );
    }
  }
}
