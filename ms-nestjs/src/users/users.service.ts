import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  private generateUserQueueName(username: string): string {
    const sanitizedUsername = username
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
    const queuePrefix = this.configService.get<string>('QUEUE_PREFIX');
    const queueSuffix = this.configService.get<string>('QUEUE_SUFFIX');
    const generatedQueueName = `${queuePrefix}-${sanitizedUsername}-${queueSuffix}`;

    return generatedQueueName;
  }

  create(createUserDTO: CreateUserDTO) {
    const queueName = this.generateUserQueueName(createUserDTO.name);

    return this.prismaService.users
      .create({
        data: {
          name: createUserDTO.name,
          publicKey: createUserDTO.publicKey,
          queueName,
        },
      })
      .then((user) => {
        this.eventEmitter.emit('user.created', {
          queueName: queueName,
          userName: user.name,
        });
      });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }
}
