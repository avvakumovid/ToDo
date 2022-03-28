import {Injectable} from '@nestjs/common';
import {Model, Schema} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose';
import {ToDo, ToDoDocument} from './schemas/todo.schema';
import {CreateTodoDto} from './CreateTodo.dto';


@Injectable()
export class TodoService {
    constructor(@InjectModel(ToDo.name) private todoModel: Model<ToDoDocument>) {
    }

    async create(createToDoDTO: CreateTodoDto): Promise<ToDo> {
        const createdTodo = new this.todoModel(createToDoDTO)
        return createdTodo.save()
    }

    async findAll(): Promise<ToDo[]> {
        return this.todoModel.find().exec()
    }
}
