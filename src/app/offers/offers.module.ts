import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/auth/auth.module';
import { OffersController } from './offers.controller';
import { OffersRepository } from './offers.reporitory';
import { OffersService } from './offers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OffersRepository]), AuthModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
