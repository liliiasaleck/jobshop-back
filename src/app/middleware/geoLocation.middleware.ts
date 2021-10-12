import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as NodeGeocoder from 'node-geocoder';

@Injectable()
export class GeoLocationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const { address, location } = req.body;
    const options: NodeGeocoder.Options = {
      provider: 'mapquest',
      httpAdapter: 'https',
      apiKey: 'nHJdAIBs75lbomj23RHp9wE3HvnF1Nbp',
    };

    const geoCoder = NodeGeocoder(options);
    try {
      const fullAddress = `${address} ${location}`;
      const result = await geoCoder.geocode(fullAddress);
      if (result.length <= 0) {
        throw new Error(
          `Could not get geolocation details for address ${fullAddress}`,
        );
      }
      const { latitude, longitude } = result[0];
      req.body = { ...req.body, latitude, longitude };
    } catch (err) {
      throw err;
    }
    next();
  }
}
