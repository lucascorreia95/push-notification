import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: loginDTO.email,
      },
    });

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isValidPassword = bcrypt.compareSync(
      loginDTO.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new Error('Invalid Credentials');
    }

    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    return { access_token: token };
  }
}
