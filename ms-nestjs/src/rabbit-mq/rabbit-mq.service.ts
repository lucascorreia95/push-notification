import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit {
  private client: ClientProxy;
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.client = this.createClient();
    await this.connect();
  }

  private createClient(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          this.configService.get<string>('RABBITMQ_URL') ||
            'amqp://guest:guest@localhost:5672',
        ],
      },
    });
  }

  private async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(
        this.configService.get<string>('RABBITMQ_URL') ||
          'amqp://guest:guest@localhost:5672',
      );
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ for queue management.');
    } catch (error) {
      console.error(
        'Error connecting to RabbitMQ for queue management:',
        error,
      );
    }
  }

  async publish(queue: string, message: any): Promise<void> {
    this.client.emit(queue, message);
  }

  consume(queue: string, callback: (message: any) => void) {
    const amqp = require('amqplib');
    amqp
      .connect(
        this.configService.get<string>('RABBITMQ_URL') ||
          'amqp://guest:guest@localhost:5672',
      )
      .then((connection) => connection.createChannel())
      .then((channel) => {
        channel.assertQueue(queue, { durable: true });
        channel.consume(
          queue,
          (msg) => {
            if (msg) {
              callback(JSON.parse(msg.content.toString()));
              channel.ack(msg);
            }
          },
          { noAck: false },
        );
      })
      .catch((error) => console.error('Error connecting to RabbitMQ:', error));
  }

  async assertQueue(
    queueName: string,
    options?: amqp.Options.AssertQueue,
  ): Promise<amqp.Replies.AssertQueue | null> {
    if (!this.channel) {
      console.error('RabbitMQ channel is not available.');
      return null;
    }
    try {
      return await this.channel.assertQueue(queueName, options);
    } catch (error) {
      console.error(`Error declaring the queue '${queueName}':`, error);
      return null;
    }
  }
}
