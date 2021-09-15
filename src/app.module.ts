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
      type: 'postgres',
      host: 'localhost',
      database: 'jobshop',
      port:5432,
      username:'postgres',
      password: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      // url: process.env.TYPEORM_CONNECTION_STRING,
      // database: process.env.TYPEORM_DATABASE,
      // password: process.env.TYPEORM_PASSWORD,
      // username: process.env.TYPEORM_USERNAME,
      
    }),
    AuthModule,
  ],
})
export class AppModule {}
