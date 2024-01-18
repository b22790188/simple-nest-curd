import { createTodoDto } from "../dto/createTodoDTO";
import { todoEntity } from "../todoEntity";

export const mockTodos: todoEntity[] = [
    {
      id: 1,
      task: 'task1',
      deadline: new Date('2002-01-01'),
      completed: false,
    },
    {
      id: 2,
      task: 'task2',
      deadline: new Date('2002-01-01'),
      completed: false,
    }
  ]

export const mockTodoDTO: createTodoDto = {
    task: 'task1',
    deadline: new Date('2002-01-01'),
    completed: false
}