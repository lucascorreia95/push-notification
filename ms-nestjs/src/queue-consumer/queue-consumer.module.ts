import { Module } from '@nestjs/common';
import { QueueConsumerService } from './queue-consumer.service';
import { DiscoveryModule } from '@nestjs/core';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [DiscoveryModule, RabbitMqModule],
  providers: [QueueConsumerService],
})
export class QueueConsumerModule {}
