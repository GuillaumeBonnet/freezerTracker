import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { BackendService } from './backend.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Freezer } from '../Class/Freezer';


@Injectable()
export class DataService {

	constructor(public bnService: BackendService) {
		this.subjListFreezer = null;
		this.subjListAliment = new Subject();
	}

	listFreezers: Freezer[];
	subjListFreezer: Subject<Freezer[]>
	curentFreezerId: Number;

	listAliments: Aliment[];
	subjListAliment: Subject<Aliment[]>
	alimentToEdit: Aliment;

	// -- Freezer related

		getFreezerSubject(): Subject<Freezer[]> {
			if(!this.subjListFreezer) {
				this.subjListFreezer = new Subject();
			}
			this.loadFreezers(); // ToDoBetter : not have the risk of loadFeezers ending before the subject is register in the client component
			return this.subjListFreezer;
		}

		loadFreezers(): Promise<any> {
			return new Promise((resolve, reject) => {
				this.bnService.getFreezers()
				.subscribe(
					(result) => {
						this.listFreezers = <Freezer[]>result;
						this.subjListFreezer.next(this.listFreezers);
						resolve();
					},
					error => {
						console.log('Error Freezers not loaded:', error);
						reject();
					},
					() => {
					}
				);
			});
		}

		addFreezer(freezerNameToAdd: String, successCallback: Function) {
			this.bnService.saveFreezer(freezerNameToAdd).subscribe(result => {
				this.listFreezers.unshift(<Freezer>result);
				successCallback();
				this.subjListFreezer.next(this.listFreezers);
			},
				error => {
					console.log('Error Freezer not added:', error);
				});
		}

		editFreezer(freezerWithChanges: Freezer): void {
			this.bnService.updateFreezer(freezerWithChanges).subscribe(
				result => {
					Object.assign(this.listFreezers.find(freezer => freezer.id == freezerWithChanges.id), freezerWithChanges);
					this.subjListFreezer.next(this.listFreezers);
				},
				error => {
					console.log('Error Aliment not updated:', error);
				}
			);
		}

		deleteFreezer(freezerIdToDelete: String): void {
			let freezerToDelete:Freezer = new Freezer(null, freezerIdToDelete);
			this.bnService.deleteFreezer(freezerToDelete).subscribe(result => {
				this.listFreezers.splice(this.listFreezers.findIndex(elem => elem.id == freezerToDelete.id), 1);
				this.subjListFreezer.next(this.listFreezers);
			},
				error => {
					console.log('Error Freezer not deleted:', error);
				});
		}


	// -- Aliments related

		getAlimentSubject(): Subject<Aliment[]> {
			return this.subjListAliment;
		}

		loadAliments(freezerId: Number): Promise<any> {
			this.curentFreezerId = freezerId;
			return new Promise((resolve, reject) => {
				this.bnService.getAliments(freezerId)
				.subscribe(
					(result) => {
						console.log('todo debug:[result]', result);
						this.listAliments = <Aliment[]>result;
						this.subjListAliment.next(this.listAliments);
						resolve();
					},
					error => {
						console.log('Error Aliment not loaded:', error);
						reject();
					},
					() => {
					}
				);
			});
		}

		addAliment(alimentToAdd: Aliment): void {
			if(!this.curentFreezerId) {
				throw "Freezer should have been chosen before doing operation on aliments.";
			}
			this.bnService.saveAliment(this.curentFreezerId, alimentToAdd).subscribe(result => {
				this.listAliments.unshift(<Aliment>result);
				this.subjListAliment.next(this.listAliments);
			},
				error => {
					console.log('Error Aliment not added:', error);
				});
		}

		editAliment(alimentWithChanges: Aliment): void {
			if(!this.curentFreezerId) {
				throw "Freezer should have been chosen before doing operation on aliments.";
			}
			console.log('todo debug:[alimentWithChangesABC]', alimentWithChanges);
			this.bnService.updateAliment(this.curentFreezerId, alimentWithChanges).subscribe(result => {
				Object.assign(this.listAliments.find(alim => alim.id == alimentWithChanges.id), alimentWithChanges);
				this.subjListAliment.next(this.listAliments);
			},
				error => {
					console.log('Error Aliment not updated:', error);
				});
		}

		deleteAliment(alimentToDelete: Aliment): void {
			if(!this.curentFreezerId) {
				throw "Freezer should have been chosen before doing operation on aliments.";
			}
			this.bnService.deleteAliment(this.curentFreezerId, alimentToDelete).subscribe(result => {
				this.listAliments.splice(this.listAliments.findIndex(elem => elem.id == alimentToDelete.id), 1);
				this.subjListAliment.next(this.listAliments);
			},
				error => {
					console.log('Error Aliment not deleted:', error);
				});
		}
}
