import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { BackendService } from './backend.service';
@Injectable()
export class DataService {

  listAliments: Aliment[];
  alimentToEdit: Aliment;
  constructor(public bnService: BackendService ) { }

  getAliments() : Aliment[] {
    if(! this.listAliments) {
      this.listAliments = this.bnService.getAliments();
    }
    return this.listAliments;
  }

  addAliment(alimentToAdd: Aliment): void {
    let addedAliment = this.bnService.saveAliment(alimentToAdd);
    if(addedAliment) {
      this.listAliments.unshift(addedAliment);
    }
    else {
      console.log('error aliment not saved');
    }
  }

  editAliment(alimentWithChanges: Aliment) : void {
    let cpy = Object.assign({}, alimentWithChanges);
    cpy.id  = this.alimentToEdit.id;
    if(this.bnService.updateAliment(cpy)) {
      Object.assign(this.alimentToEdit, alimentWithChanges);
    }
    else {
      console.log('error edit');
    }
  }
}
