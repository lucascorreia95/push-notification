import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';
import { QueueConsumerInterface } from './interface/queue-consumer.interface';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class QueueConsumerService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly rabbitmqService: RabbitMqService,
  ) {}

  private consumers: Map<string, QueueConsumerInterface> = new Map();

  onModuleInit() {
    const providers = this.discoveryService.getProviders();
    for (const provider of providers) {
      const instance = provider.instance;
      if (
        instance &&
        typeof instance.handleMessage === 'function' &&
        typeof instance.getQueueName === 'function'
      ) {
        const consumer = instance as QueueConsumerInterface;
        this.rabbitmqService.consume(
          consumer.getQueueName(),
          consumer.handleMessage.bind(consumer),
        );
        console.log(
          `Consumer registered for queue: ${consumer.getQueueName()}`,
        );
      }
    }
  }

  @OnEvent('queue.created')
  handleQueueCreatedEvent({ queueName }: { queueName: string }) {
    try {
      this.rabbitmqService.consume(queueName, () =>
        console.log('handler for ', queueName),
      );
      console.log(
        `Consumer started for dynamically created queue: ${queueName}`,
      );
    } catch (err) {
      console.warn(`Error to start the consumer queue: ${queueName}`);
    }
  }
}
