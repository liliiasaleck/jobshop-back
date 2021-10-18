import { Exclude } from 'class-transformer';
import User from 'src/app/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Logo from './logo.entity';

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
  webSite: string;
  @Column()
  tech: string;
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
  @Column({ default: 0, type: 'decimal' })
  longitude: number;
  @Column({ default: 0 , type: 'decimal'})
  latitude: number;
  @JoinColumn()
  @OneToOne(
    () => Logo,
    {
      eager: true,
      nullable: true
    }
  )
  public logo?: Logo;
}
