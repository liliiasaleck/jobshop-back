import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Logo {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;
}
 
export default Logo;