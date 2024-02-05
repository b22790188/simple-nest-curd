import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/createTodoDTO';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodo() {
    return this.todoService.getTodo();
  }

  @Post()
  async createTodo(@Body() todo: createTodoDto) {
    return this.todoService.createTodo(todo);
  }

  @Patch(':id')
  async updateTodo(
    @Body() todo: createTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
