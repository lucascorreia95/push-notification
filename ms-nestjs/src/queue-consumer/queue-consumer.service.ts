import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class QueueConsumerService implements OnModuleInit {
  constructor(
    private readonly rabbitmqService: RabbitMqService,
    private readonly configService: ConfigService,
  ) {}

  private handleQueueMsg(event) {
    console.log('*************************');
    console.log('handler queue msg ', event);
  }

  async onModuleInit() {
    try {
      const queueName = this.configService.get<string>('QUEUE_NAME');

      this.rabbitmqService.consume(queueName!, (event) =>
        this.handleQueueMsg(event),
      );

      console.log(`Consumer started for queue: ${queueName}`);
    } catch (err) {
      console.warn(`Error to start the consumer queue: ${err}`);
    }
  }
}
