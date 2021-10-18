import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'aws-sdk';
import { AuthModule } from 'src/app/auth/auth.module';
import Logo from './logo.entity';
import { LogoService } from './logo.service';
import { OffersController } from './offers.controller';
import { OffersRepository } from './offers.reporitory';
import { OffersService } from './offers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OffersRepository, Logo]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [OffersController],
  providers: [OffersService, LogoService, ConfigService],
})
export class OffersModule {}
