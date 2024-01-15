import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todoEntity } from './todoEntity';

@Module({
  imports: [TypeOrmModule.forFeature([todoEntity])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
