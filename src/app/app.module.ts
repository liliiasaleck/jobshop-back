import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '../config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,      
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // const isProduction = configService.get('STAGE') === 'prod';
        return{
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          host:configService.get('DB_HOST'),
          port:configService.get('DB_PORT'),
          database:configService.get('DB_DATABASE'),
          username:configService.get('DB_USERNAME'),
          password:configService.get('DB_PASSWORD'),
          ssl: {     
            require: true,
            rejectUnauthorized: false 
          },       
        }
      },
    }),
    OffersModule,
    AuthModule,
    FormModule,
  ],
})
export class AppModule {}
