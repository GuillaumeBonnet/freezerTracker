import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {

  listAliments: Aliment[];
  subjListAliment:  Subject<Aliment[]>
  alimentToEdit: Aliment;
  constructor(public bnService: BackendService ) {
    this.subjListAliment = new Subject();
   }

   getAlimentSubject(): Subject<Aliment[]> {     
    return this.subjListAliment;
   }

  loadAliments() : void {
      this.bnService.getAliments().subscribe((result) => {        
        this.listAliments = <Aliment[]>result;
      }, error => {
        console.log('Error Aliment not loaded:', error);
      }, () => {
        this.subjListAliment.next(this.listAliments);
      })
  }

  addAliment(alimentToAdd: Aliment): void {
    console.log('todo debug:[alimentToAdd]', alimentToAdd);
    console.log('todo debug:[alimentToAddJSON]', JSON.stringify(alimentToAdd));
    
    
    this.bnService.saveAliment(alimentToAdd).subscribe(result => {
      this.listAliments.unshift(<Aliment>result);
      this.subjListAliment.next(this.listAliments);
    },
    error => {
      console.log('Error Aliment not added:', error);
    });
  }

  editAliment(alimentWithChanges: Aliment) : void {
    console.log('todo debug:[alimentWithChangesABC]', alimentWithChanges);
    this.bnService.updateAliment(alimentWithChanges).subscribe(result => {
      Object.assign(this.listAliments.find(alim => alim.id == alimentWithChanges.id), alimentWithChanges);
      this.subjListAliment.next(this.listAliments);
    },  
    error => {
      console.log('Error Aliment not updated:', error);
    });
  }

  delete(alimentToDelete: Aliment): void {
    this.bnService.delete(alimentToDelete).subscribe(result => {
      this.listAliments.splice(this.listAliments.findIndex(elem => elem.id == alimentToDelete.id), 1);
      this.subjListAliment.next(this.listAliments);
    },
    error => {
      console.log('Error Aliment not deleted:', error);
    });
  }
}
