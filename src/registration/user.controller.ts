import { Body, Controller, Get, Injectable, Post } from "@nestjs/common";
import bcrypt from 'bcrypt'
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}
  
  @Post()
  async registration(@Body() createUserDto: CreateUserDto ){

    const response = await this.userService.create(createUserDto)
    return response
    
    // const {username, password} = createUserDto

    // const condidate = await this.userService.findUser(username)

  }

  @Get()
  async findAll() {
    const response = await this.userService.findAll()
    return response
  }
}
