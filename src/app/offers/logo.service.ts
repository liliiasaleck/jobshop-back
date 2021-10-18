import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Logo from './logo.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LogoService {
  constructor(
    @InjectRepository(Logo)
    private LogoRepository: Repository<Logo>,
    private readonly configService: ConfigService,
  ) {}

  async uploadLogo(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.LogoRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.LogoRepository.save(newFile);
    return newFile;
  }
}
