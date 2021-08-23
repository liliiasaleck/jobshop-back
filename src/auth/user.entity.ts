import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}

export default User;
