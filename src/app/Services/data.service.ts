import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { BackendService } from './backend.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DataService {

	constructor(public bnService: BackendService) {
		this.subjListAliment = new Subject();
	}


	curentFreezerId: Number;
	listAliments: Aliment[];
	subjListAliment: Subject<Aliment[]>
	alimentToEdit: Aliment;

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
