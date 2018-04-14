import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');

@Injectable()
export class DataService {

  listAliments: Aliment[] = MOCK_ALIMENTS;
  alimentToEdit: Aliment;
  constructor() { }

  getAliments() : Aliment[] {
    return this.listAliments;
  }

  addAliment(alimentToAdd: Aliment): void {
    this.listAliments.unshift(alimentToAdd);
  }
}
