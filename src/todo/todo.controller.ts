import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateTodoDto} from './CreateTodo.dto';
import {TodoService} from './todo.service';
import {response} from 'express';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {
    }

    @Get()
    async findAll() {

        const response = await this.todoService.findAll()
        return response

    }

    @Post()
    async create(@Body() createToDoDto: CreateTodoDto) {
        const response = await this.todoService.create(createToDoDto)
        return response
    }
}
