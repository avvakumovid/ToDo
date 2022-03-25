import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ToDo, ToDoSchema} from './schemas/todo.schema';
import {TodoController} from './todo.controller';
import {TodoService} from './todo.service';


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: ToDo.name,
            schema: ToDoSchema
        }]), MongooseModule.forRoot('mongodb://localhost:27017/todo'),],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule {
}
