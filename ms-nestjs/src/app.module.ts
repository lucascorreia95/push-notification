import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { QueueConsumerModule } from './queue-consumer/queue-consumer.module';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QueueManagementModule } from './queue-management/queue-management.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    QueueConsumerModule,
    RabbitMqModule,
    EventEmitterModule.forRoot(),
    QueueManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
