import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');
@Injectable()
export class BackendService {

  listAliments: Aliment[] = MOCK_ALIMENTS;
  constructor() {}

  getAliments() : Aliment[] {
    console.log('AlimetBNS');
    return this.listAliments;
  }

  saveAliment(alimentToSave: Aliment): Aliment {
    //request
    let idReturned = 36;
    if( idReturned != null) {
      let cpy = Object.assign({}, alimentToSave);
      cpy.id = idReturned
      return cpy;
    }
    else {
      console.log('error aliment not saved');
      return null;
    }
  }

  updateAliment(alimentToUpdate: Aliment) {
    //request
    let retout = true;
    return retout;
  }
}
