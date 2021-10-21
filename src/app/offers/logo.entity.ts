import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Offer } from './offer.entity';
 
@Entity()
class Logo {
  @PrimaryGeneratedColumn('uuid')
  public id: number;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;

  @OneToOne(() => Offer, (offer) => offer.logo, { nullable: true })
  offer?: Offer;
}


 
export default Logo;