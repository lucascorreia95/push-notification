import { Module } from '@nestjs/common';
import { QueueProducerService } from './queue-producer.service';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  providers: [QueueProducerService],
  exports: [QueueProducerService],
})
export class QueueProducerModule {}
