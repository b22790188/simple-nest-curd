import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class todoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column()
    deadline: Date;

    @Column()
    completed: boolean;
}