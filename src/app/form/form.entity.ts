
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  about: string;
  @Column()
  resume: string;
}
