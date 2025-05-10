import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { Users } from 'generated/prisma';
import { User } from 'src/auth/decorators/user.decorator';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @User() user: Users,
    @Body() createNotificationDTO: CreateNotificationDTO,
  ) {
    return this.notificationsService.create(createNotificationDTO, user);
  }
}
