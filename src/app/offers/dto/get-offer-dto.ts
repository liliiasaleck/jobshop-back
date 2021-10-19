import {  IsEnum, IsOptional, IsString } from 'class-validator';
import { TechType } from '../models/tech.model';
import { ExperienceType } from '../models/experience.model';
import { EmploymentType } from '../models/employmentType.model';
import { LocationType } from '../models/location.model';

export class GetOfferDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsEnum(LocationType)
  location?: LocationType;
  @IsOptional()
  @IsEnum(TechType)
  tech?: TechType;
  @IsOptional()
  @IsEnum(ExperienceType)

  experience?: ExperienceType;
  @IsOptional()
  @IsEnum(EmploymentType)

  employmentType?: EmploymentType;
  @IsOptional()
  salaryFrom?: number;
  @IsOptional()
  salaryTo?: number;
  
}
