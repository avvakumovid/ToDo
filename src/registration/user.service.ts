import { Injectable } from '@nestjs/common';
import {Model, Schema} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto)
        return createdUser.save()
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }
}
