import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ToDoType, User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUser(username): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async addToDo(username: string, todo: ToDoType) {
    const user = await this.userModel.findOne({ username });
    user.todolist.push(todo);
    user.save();
    return { message: 'Задача добавлена' };
  }
}
