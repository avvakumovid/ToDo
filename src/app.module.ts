import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { User, UserSchema } from './registration/schema/user.schema';
import { UserController } from './registration/user.controller';
import { UserService } from './registration/user.service';
import { ToDo, ToDoSchema } from './todo/schemas/todo.schema';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      {
        name: ToDo.name,
        schema: ToDoSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@todo.5gzvz.mongodb.net/todo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [TodoController, UserController],
  providers: [TodoService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthMiddleware)
      .exclude(
        { path: 'user/registration', method: RequestMethod.POST },
        { path: 'user/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
