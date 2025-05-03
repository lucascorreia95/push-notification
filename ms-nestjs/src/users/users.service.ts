import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDTO: CreateUserDTO) {
    return this.prismaService.users.create({
      data: {
        email: createUserDTO.email,
        password: bcrypt.hashSync(createUserDTO.password, 10),
      },
    });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }
}
