import {Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as NodeGeocoder from 'node-geocoder';

@Injectable()
export class GeoLocationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const { address } = req.body;
    const options: NodeGeocoder.Options = {
      provider: 'mapquest',
      httpAdapter: 'https',
      apiKey: 'nHJdAIBs75lbomj23RHp9wE3HvnF1Nbp'
    };


    const geoCoder = NodeGeocoder(options);
    try {
      const result = await geoCoder.geocode(address);
      req.body = { ...req.body, lat: result.lat, long: result.long};
    } catch (error) {
      console.log(error);
    }
    next();
  }
}
