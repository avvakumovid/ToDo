import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './registration/schema/user.schema';
import { UserController } from './registration/user.controller';
import { UserService } from './registration/user.service';
import { ToDo, ToDoSchema } from './todo/schemas/todo.schema';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: ToDo.name,
            schema: ToDoSchema
        }, {
            name: User.name,
            schema: UserSchema
        }]), MongooseModule.forRoot('mongodb://localhost:27017/todo'),],
    controllers: [TodoController, UserController],
    providers: [TodoService, UserService]

})
export class AppModule {
}
