import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import User from './auth/user.entity';
import { Offer } from './offers/offer.entity';

@Module({
  imports: [
    OffersModule,
    TypeOrmModule.forRoot({
      url:'mongodb+srv://michal:Michalsmolarek1@cluster0.oajex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      type: 'mongodb',
      host: 'localhost',
      database: 'myFirstDatabase',
      useNewUrlParser: true,
      password: 'Michalsmolarek1',
      synchronize: true,
      username: 'michal',
      entities: [User, Offer],
      ssl: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      // url: process.env.TYPEORM_CONNECTION_STRING,
      // database: process.env.TYPEORM_DATABASE,
      // password: process.env.TYPEORM_PASSWORD,
      // username: process.env.TYPEORM_USERNAME,
      
    }),
    AuthModule,
  ],
})
export class AppModule {}
