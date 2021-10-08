import {  IsOptional, IsString } from 'class-validator';
import { TechType } from '../models/tech.model';
import { ExperienceType } from '../models/experience.model';
import { EmploymentType } from '../models/employmentType.model';
import { LocationType } from '../models/location.model';

export class GetOfferDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  location?: LocationType;
  @IsOptional()
  tech?: TechType;
  @IsOptional()
  experience?: ExperienceType;
  @IsOptional()
  employmentType?: EmploymentType;
  @IsOptional()
  salaryFrom?: number;
  @IsOptional()
  salaryTo?: number;
  @IsOptional()
  map?: {
    lat: number,
    lng: number,
}}
