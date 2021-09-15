import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { FormController } from './form/form.controller';
import { FormModule } from './form/form.module';

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
    }),
    AuthModule,
    FormModule,
  ],
})
export class AppModule {}
