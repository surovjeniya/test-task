import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { hash } from 'bcryptjs';
import { IUser, JwtPayload } from 'src/auth/types/auth.types';
import { USER_NOT_FOUND } from './consts/user.consts';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await hash(dto.password, 3);
    const firstName =
      dto.firstName[0].toUpperCase() + dto.firstName.slice(1).toLowerCase();
    const lastName =
      dto.lastName[0].toUpperCase() + dto.lastName.slice(1).toLowerCase();
    const user = new this.userModel({
      ...dto,
      password: hashedPassword,
      firstName,
      lastName,
    });
    console.log(user);
    return await user.save();
  }

  async getUserById(id: any): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getPersonalInfo({
    user: { _id, email, firstName, lastName },
  }: JwtPayload): Promise<IUser> {
    const user = await this.getUserById(_id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return {
      _id,
      email,
      firstName,
      lastName,
    };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async getUserByPhone(phoneNumber: string): Promise<User> {
    return await this.userModel.findOne({ phoneNumber });
  }
}
