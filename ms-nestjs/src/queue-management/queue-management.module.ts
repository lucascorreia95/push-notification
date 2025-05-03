import { Module } from '@nestjs/common';
import { QueueManagementService } from './queue-management.service';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  providers: [QueueManagementService],
})
export class QueueManagementModule {}
