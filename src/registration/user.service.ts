import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ToDoType, User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import UpdateToDoDto from './dto/UpdateToDo.dto';
import { UserDto } from './dto/User.dto';
import { Types } from 'mongoose';

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
    return user.todolist;
  }

  async changeToDo(username: string, updateToDoDto: UpdateToDoDto) {
    const { id, content, date, done, title } = updateToDoDto;
    const changes = {}
    if(content){
      changes['todolist.$.content'] = content
    }
    if(date){
      changes['todolist.$.date'] = date
    }
    if(done){
      changes['todolist.$.done'] = done
    }
    if(title){
      changes['todolist.$.title'] = title
    }

    const user = await this.userModel.updateOne(
      { username, 'todolist.id': id },
      { $set: changes },
    );

    // await user.save();
    return { message: 'Данные изменены' };
  }

  async removeToDo(username: string, id: string) {
    const user = await this.userModel.findOneAndUpdate(
      {
        username,
      },
      { $pull: { todolist: { id } } },
    );
  }

  async getToDoList(username: string) {
    const user = await this.userModel.findOne({ username });
    return user.todolist;
  }

  async;
}
