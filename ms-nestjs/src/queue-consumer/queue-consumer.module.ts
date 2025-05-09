import { Module } from '@nestjs/common';
import { QueueConsumerService } from './queue-consumer.service';
import { DiscoveryModule } from '@nestjs/core';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DiscoveryModule, RabbitMqModule, UsersModule],
  providers: [QueueConsumerService],
})
export class QueueConsumerModule {}
