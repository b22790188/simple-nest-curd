import { IsBoolean, IsDate, IsString } from 'class-validator';

export class createTodoDto {
  @IsString()
  task: string;

  @IsDate()
  deadline: Date;

  @IsBoolean()
  completed: boolean;
}
