import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

export type UserRole = 'user' | 'admin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: 'user' })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
