import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dto/User.dto';
import { env } from 'process';
import { CreateTodoDto } from 'src/todo/CreateTodo.dto';
import { ToDoType } from './schema/user.schema';
import { Types } from 'mongoose';
import UpdateToDoDto from './dto/UpdateToDo.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, // private configService: ConfigService,
  ) {}

  @Post('/registration')
  async registration(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const { username, password } = createUserDto;

    const condidate = await this.userService.findUser(username);

    const hashPassword = bcrypt.hashSync(password, 8);

    createUserDto.password = hashPassword;

    if (condidate) {
      return res.status(HttpStatus.CONFLICT).send({
        message: `Пользователь ${username} уже существует`,
      });
    }

    const response = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).send({
      message: `Пользователь создан`,
    });
  }

  @Get()
  async findAll() {
    const response = await this.userService.findAll();
    return response;
  }

  @Post('/login')
  async login(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { username, password } = userDto;
      const user = await this.userService.findUser(username);
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        return res.status(400).json({ message: `Неверный пароль` });
      }

      const token = this.generateAccessToken(user.username, user.todolist);
      return res.json(token);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
  @Get('/auth')
  async auth(@Req() req: Request) {
    try {
      const user = await this.userService.findUser(req.body.username);
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/add')
  async addToDo(@Req() req: Request, @Body() createTodoDto: CreateTodoDto) {
    const ToDo: ToDoType = {
      id: new Types.ObjectId().toString(),
      content: createTodoDto.content,
      title: createTodoDto.title,
      date: new Date(),
      done: false,
    };
    const response = await this.userService.addToDo(req.body.username, ToDo);
    return response;
  }

  @Put('/todo')
  async changeDone(@Body() updateToDoDto: UpdateToDoDto, @Req() req: Request) {
    return await this.userService.changeToDo(req.body.username, updateToDoDto);
  }

  @Get('/todolist')
  async userToDoList(@Req() req: Request) {
    const todoList = await this.userService.getToDoList(req.body.username);
    return todoList;
  }

  @Delete('/remove/:id')
  async removFromTodoList(@Req() req: Request, @Param('id') id: string) {
    console.log(id);

    return await this.userService.removeToDo(req.body.username, id);
  }

  generateAccessToken(username, todolist) {
    const payload = { username, todolist };
    return jwt.sign(payload, env.SECRET_KEY, {
      expiresIn: '24h',
    });
  }
}
