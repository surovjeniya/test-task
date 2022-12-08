import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import {
  INCORRECT_EMAIL,
  INCORRECT_PASSWORD,
  USER_ALREADY_REGISTER,
} from './consts/auth.consts';
import { LoginDto } from './dto/login.dto';
import { AuthResponse, JwtPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(USER_ALREADY_REGISTER, HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userService.createUser(dto);
    const token = await this.generateJwtToken(newUser);
    return {
      user: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      token,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException(INCORRECT_EMAIL, HttpStatus.BAD_REQUEST);
    }
    const comparePassword = await compare(dto.password, user.password);
    if (!comparePassword) {
      throw new HttpException(INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    const token = await this.generateJwtToken(user);
    return {
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  }

  async generateJwtToken({
    email,
    firstName,
    lastName,
    _id,
  }: User): Promise<string> {
    const payload: JwtPayload = {
      user: { email, firstName, lastName, _id },
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async vefiryJWt(token: string): Promise<JwtPayload> {
    const userData: JwtPayload = await this.jwtService.verifyAsync(token);
    return userData;
  }
}
