import {Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as NodeGeocoder from 'node-geocoder';

@Injectable()
export class GeoLocationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const { address } = req.body;
    const options: NodeGeocoder.Options = {
      provider: 'google',
    };

    const geoCoder = NodeGeocoder(options);
    const result = await geoCoder.geocode(address);

    req.body = {...req.body, lat: result.lat, long: result.long}
    next();
  }
}
