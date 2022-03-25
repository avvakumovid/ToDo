import {Controller, Get} from '@nestjs/common';

@Controller('todo')
export class TodoController {

    @Get()
    findAll(){
        return 'All to-do list'
    }
}
