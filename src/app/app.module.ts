import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '../config.schema';
import { GeoLocationMiddleware } from './middleware/geoLocation.middleware';

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
        return {
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          awsRegion: configService.get('AWS_REGION'),
          awsAccessKey: configService.get('AWS_ACCESS_KEY_ID'),
          awsSecretKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          awsPublicBucketName: configService.get('AWS_PUBLIC_BUCKET_NAME'),
          access: configService.get('ACCESS'),
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        };
      },
    }),
    OffersModule,
    AuthModule,
    FormModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GeoLocationMiddleware)
      .forRoutes({ path: 'offers', method: RequestMethod.POST });
  }
}
