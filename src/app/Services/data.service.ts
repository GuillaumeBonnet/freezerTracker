import { Injectable, Inject } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { BackendService } from './backend.service';
import { Observable, Subject, Subscription, of, throwError, iif } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { Freezer } from '../Class/Freezer';
import { UserInfo } from '../Class/UserInfo';


@Injectable()
export class DataService {

	constructor(@Inject('BackendService') public backendService: BackendService) {
	}

	listFreezers: Freezer[];

	mapFreezerContents: { [id: string]: Aliment[] } = {};

	userInfo: UserInfo;

	/* -------------------------------------------------------------------------- */
	/*                                    Users                                   */
	/* -------------------------------------------------------------------------- */
	getUserInfo(): Observable<UserInfo> {
		return this.backendService.getUserInfo().pipe(
			map((userInfo: UserInfo) => {
				this.userInfo = userInfo;
				return userInfo;
			})
		);
	}



	/* -------------------------------------------------------------------------- */
	/*                                   Freezers                                 */
	/* -------------------------------------------------------------------------- */

		getFreezers(): Observable<Freezer[]> {
			if(this.listFreezers) {
				return of(this.listFreezers);
			}
			else {
				return this.backendService.getFreezers().
					pipe(
						tap((freezers: Freezer[])=> {
							this.listFreezers = freezers;
						})
					);
			}
		}

		addFreezer(freezerNameToAdd: string, successCallback: Function) {
			this.backendService.saveFreezer(freezerNameToAdd).subscribe({
				next: result => {
					this.listFreezers.unshift(<Freezer>result);
					successCallback(); //TODO return observable
				},
				error: error => {
					console.log('Error Freezer not added:', error);
				}
			});
		}

		editFreezer(freezerWithChanges: Freezer): void {
			this.backendService.updateFreezer(freezerWithChanges).subscribe(
				result => {
					Object.assign(this.listFreezers.find(freezer => freezer.id == freezerWithChanges.id), freezerWithChanges);
				},
				error => {
					console.log('Error Aliment not updated:', error);
				}
			);
		}

		deleteFreezer(freezerIdToDelete: number): void {
			let freezerToDelete:Freezer = new Freezer({id:freezerIdToDelete});
			this.backendService.deleteFreezer(freezerToDelete).subscribe(result => {
				this.listFreezers.splice(this.listFreezers.findIndex(elem => elem.id == freezerToDelete.id), 1);
			},
				error => {
					console.log('Error Freezer not deleted:', error);
				});
		}


	/* -------------------------------------------------------------------------- */
	/*                                  Aliments                                  */
	/* -------------------------------------------------------------------------- */

		getFreezerContent(freezerId: string): Observable<Aliment[]> {
			if(this.mapFreezerContents[freezerId]) {
				return of(this.mapFreezerContents[freezerId]);
			}
			return this.backendService.getAliments(freezerId).pipe(
				map((aliments: Aliment[]) => {
					return this.mapFreezerContents[freezerId] = aliments;
				})
			);
		}

		addAliment(freezerId: string, alimentToAdd: Aliment): Observable<Aliment> {
			return this.getFreezerContent(freezerId).pipe(
				switchMap((freezerContent: Aliment[]) => {
					return this.backendService.saveAliment(freezerId, alimentToAdd).pipe(
						tap((alimentWithid: Aliment) => {
							freezerContent.unshift(alimentWithid);
						})
					);
				})
			);
		}

		editAliment(freezerId: string, alimentWithUpdates: Aliment): Observable<Aliment>  {
			return this.getFreezerContent(freezerId).pipe(
				switchMap((freezerContent: Aliment[]) => {
					return this.backendService.updateAliment(freezerId, alimentWithUpdates).pipe(
						tap((alimentWithUpdates: Aliment) => {
							Object.assign(freezerContent.find(alim => alim.id == alimentWithUpdates.id), alimentWithUpdates);
						})
					);
				})
			);

		}

		deleteAliment(freezerId: string, alimentToDelete: Aliment): Observable<Object> {
			return this.getFreezerContent(freezerId).pipe(
				switchMap((freezerContent: Aliment[]) => {
					return this.backendService.deleteAliment(freezerId, alimentToDelete).pipe(
						tap((alimentWithUpdates: Aliment) => {
							freezerContent.splice(freezerContent.findIndex(elem => elem.id == alimentToDelete.id), 1);
						})
					);
				})
			);
		}
}
