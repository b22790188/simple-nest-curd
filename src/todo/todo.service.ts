import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todoEntity } from './todoEntity';
import { Repository } from 'typeorm';
import { createTodoDto } from './dto/createTodoDTO';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(todoEntity) private todoRepo: Repository<todoEntity>,
  ) {}

  async getTodo(): Promise<todoEntity[]> {
    return this.todoRepo.find();
  }

  async createTodo(todo: createTodoDto): Promise<todoEntity> {
    try {
      const newTodo = this.todoRepo.create(todo);
      return this.todoRepo.save(newTodo);
    } catch (err) {
      console.log('Create new todo error:O', err.message ?? err);
      throw new HttpException(
        'Create new todo error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTodo(id: number, todo: createTodoDto): Promise<todoEntity> {
    let foundTodo = await this.todoRepo.findOneBy({ id: id });

    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    foundTodo = { ...foundTodo, ...todo };
    return this.todoRepo.save(foundTodo);
  }

  async deleteTodo(id: number): Promise<number> {
    const foundTodo = await this.todoRepo.findOneBy({ id: id });
    /**
     * Cause Repository.delete does not check if entity exists in databsae ,
     * so we need to manually check it
     */
    if (!foundTodo) {
      throw new HttpException(
        'Delete error: Todo not found',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.todoRepo.delete(id);
    return id;
  }
}
