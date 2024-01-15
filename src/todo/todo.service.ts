import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todoEntity } from './todoEntity';
import { Repository } from 'typeorm';
import { createTodoDto } from './dto/createTodoDTO';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(todoEntity) private todoRepo: Repository<todoEntity>){}

    async getTodo(): Promise<todoEntity[]>{
        return this.todoRepo.find();
    }

    async createTodo(todo: createTodoDto): Promise<todoEntity>{
        const newTodo = this.todoRepo.create(todo);
        return this.todoRepo.save(newTodo);
    }

    async updateTodo(id: number, todo: createTodoDto): Promise<todoEntity>{
        let foundTodo = await this.todoRepo.findOneBy({ id: id });
        foundTodo = {...foundTodo, ...todo};

        return this.todoRepo.save(foundTodo);
    }      

    async deleteTodo(id: number): Promise<number>{
        const foundTodo = await this.todoRepo.findOneBy({ id: id });
        await this.todoRepo.delete(id);
        return id;
    }
}
