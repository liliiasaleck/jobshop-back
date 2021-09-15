import { Exclude } from 'class-transformer';
import User from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  salaryFrom: number;
  @Column()
  salaryTo: number;
  @Column()
  location: string;
  @Column()
  tech: string;
  @Column()
  logo: string;
  @Column()
  experience: string;
  @Column()
  companySize: number;
  @Column()
  companyName: string;
  @Column()
  employmentType: string;
  @Column()
  jobDescription: string;
  @Column()
  aboutCompany: string;

  
}
