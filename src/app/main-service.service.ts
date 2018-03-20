import { Injectable } from '@angular/core';

@Injectable()
export class MainServiceService {

  constructor() { }
  pixelToNumber(pixelString:String): number  {
    return +pixelString.substr(0, pixelString.length - 2);
  }

}
