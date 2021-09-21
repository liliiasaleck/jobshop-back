import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetOfferDto {
  @IsOptional()
  @IsString()
  search?: string;
}

export class Filter{
  salaryFrom: number;
  salaryTo: number;
  location: string;
  tech: string;
  experience: string;
  employmentType: string;
}
