import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IUser, JwtPayload } from 'src/auth/types/auth.types';
import { USER_NOT_FOUND } from './consts/user.consts';
import { User } from './decorator/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('get-by-id/:id')
  // async getUserBId(@Param('id') id: string): Promise<IUser | string> {
  //   const { _id, email, firstName, lastName } =
  //     await this.userService.getUserById(id);
  //   const user: IUser = { _id, email, firstName, lastName };
  //   if (user) {
  //     return {
  //       ...user,
  //     };
  //   } else {
  //     throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  //   }
  // }

  @UseGuards(new AuthGuard())
  @Get('/personal')
  async getPersonalInfo(@User() user: JwtPayload) {
    return await this.userService.getPersonalInfo(user);
  }
}
