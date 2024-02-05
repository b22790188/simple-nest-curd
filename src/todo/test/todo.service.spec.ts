import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../todo.service';
import { todoEntity } from '../todoEntity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mockTodoRepo } from './mockTodoRepo';
import { mockTodos } from './mockData';
import { mockTodoDTO } from './mockData';
import { HttpException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let todoRepo: Repository<todoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(todoEntity),
          useValue: mockTodoRepo,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    todoRepo = module.get<Repository<todoEntity>>(
      getRepositoryToken(todoEntity),
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTodo', () => {
    it('should return an array of todo', async () => {
      jest.spyOn(todoRepo, 'find').mockResolvedValue(mockTodos);

      const result = await service.getTodo();
      expect(result).toBeInstanceOf(Array<todoEntity>);
      expect(todoRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTodo', () => {
    it('it should create new todo', async () => {
      const mockTodoEntity = new todoEntity();
      mockTodoEntity.id = 10;
      mockTodoEntity.task = mockTodoDTO.task;
      mockTodoEntity.deadline = mockTodoDTO.deadline;
      mockTodoEntity.completed = mockTodoDTO.completed;

      jest
        .spyOn(todoRepo, 'create')
        .mockReturnValueOnce(mockTodoDTO as todoEntity);
      jest.spyOn(todoRepo, 'save').mockResolvedValueOnce(mockTodoEntity);

      const result = await service.createTodo(mockTodoDTO);

      expect(result).toBeInstanceOf(todoEntity);
      expect(result).toBe(mockTodoEntity);
      expect(todoRepo.create).toHaveBeenCalledTimes(1);
      expect(todoRepo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo', () => {
    it('should return a update todo', async () => {
      jest
        .spyOn(todoRepo, 'findOneBy')
        .mockResolvedValueOnce(mockTodoDTO as todoEntity);
      await service.updateTodo(1, mockTodoDTO);

      expect(todoRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(todoRepo.save).toHaveBeenCalledTimes(1);
      expect(todoRepo.save).toHaveBeenCalledWith(mockTodoDTO);
    });

    it('should throw an error if todo not found', async () => {
      jest.spyOn(todoRepo, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(service.updateTodo(10, mockTodoDTO)).rejects.toThrow(
        HttpException,
      );
      expect(todoRepo.findOneBy).toHaveBeenCalledWith({ id: 10 });
      expect(todoRepo.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      jest
        .spyOn(todoRepo, 'findOneBy')
        .mockResolvedValueOnce(mockTodoDTO as todoEntity);

      const id = await service.deleteTodo(1);

      expect(todoRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(todoRepo.delete).toHaveBeenCalledTimes(1);
      expect(id).toBe(1);
    });

    it('should throw http exception if todo not found', async () => {
      jest.spyOn(todoRepo, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(service.deleteTodo(10)).rejects.toThrow(HttpException);

      expect(todoRepo.findOneBy).toHaveBeenCalledWith({ id: 10 });
      expect(todoRepo.findOneBy).toHaveBeenCalledTimes(1);
    });
  });
});
