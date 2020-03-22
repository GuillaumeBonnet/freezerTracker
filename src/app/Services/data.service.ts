import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { BackendService } from './backend.service';
import { Observable, Subject, Subscription, of, throwError, iif, Observer, PartialObserver } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { Freezer } from '../Class/Freezer';
import { UserInfo } from '../Class/UserInfo';


@Injectable()
export class DataService {

	constructor(@Inject('BackendService') public backendService: BackendService) {
		this.spinnerEvent = new EventEmitter<Boolean>();
	}

	shutDownSpinner: Function = () => {
		return tap({
			next: () => {
				this.spinnerEvent.emit(false);
			},
			error: () => {
				this.spinnerEvent.emit(false);
			},
		});
	}


	spinnerEvent :EventEmitter<Boolean>;

	listFreezers: Freezer[];

	mapFreezerContents: { [id: string]: Aliment[] } = {};

	userInfo: UserInfo;

	/* -------------------------------------------------------------------------- */
	/*                                    Users                                   */
	/* -------------------------------------------------------------------------- */
	getUserInfo(): Observable<UserInfo> {
		this.spinnerEvent.emit(true);
		return this.backendService.getUserInfo().pipe(
			this.shutDownSpinner(),
			map((userInfo: UserInfo) => {
				this.userInfo = userInfo;
				return userInfo;
			})
		);
	}

	login(username:string, password:string): Observable<Object> {
		this.spinnerEvent.emit(true);
		return this.backendService.login(username, password).pipe(
			this.shutDownSpinner()
		);
	}

	logout(): Observable<Object> {
		this.spinnerEvent.emit(true);
		return this.backendService.logout().pipe(
			this.shutDownSpinner()
		);
	}

	register(registrationInfo: { username: any; email: any; password: any; matchingPassword: any; }): Observable<Object> {
		this.spinnerEvent.emit(true);
		return this.backendService.register(registrationInfo).pipe(
			this.shutDownSpinner()
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
				this.spinnerEvent.emit(true);
				return this.backendService.getFreezers().
					pipe(
						this.shutDownSpinner(),
						tap((freezers: Freezer[])=> {
							this.listFreezers = freezers;
						})
					);
			}
		}

		addFreezer(freezerNameToAdd: string): Observable<Object> {
			this.spinnerEvent.emit(true);
			return this.backendService.saveFreezer(freezerNameToAdd).pipe(
				this.shutDownSpinner(),
				tap({
					next: (freezer: Freezer) => {
						this.listFreezers.unshift(freezer);
					},
					error: (error) => {
						console.log('Error Freezer not added:', error);
					}
				})
			);
		}

		editFreezer(freezerWithChanges: Freezer): Observable<Freezer> {
			this.spinnerEvent.emit(true);
			return this.backendService.updateFreezer(freezerWithChanges).pipe(
				this.shutDownSpinner(),
				tap({
					next: (result) => {
						Object.assign(this.listFreezers.find(freezer => freezer.id == freezerWithChanges.id), freezerWithChanges);
					},
					error: (error) => {
						console.log('Error Aliment not updated:', error);
					}
				})
			);
		}

		deleteFreezer(freezerIdToDelete: number): Observable<Object> {
			let freezerToDelete:Freezer = new Freezer({id:freezerIdToDelete});

			return this.getFreezers().pipe(
				switchMap((freezers: Freezer[]) => {
					this.spinnerEvent.emit(true);
					return this.backendService.deleteFreezer(freezerToDelete).pipe(
						this.shutDownSpinner(),
						tap(() => {
							freezers.splice(freezers.findIndex(elem => elem.id == freezerToDelete.id), 1);
						})
					);
				})
			);
		}


	/* -------------------------------------------------------------------------- */
	/*                                  Aliments                                  */
	/* -------------------------------------------------------------------------- */

		getFreezerContent(freezerId: number): Observable<Aliment[]> {
			if(this.mapFreezerContents[freezerId]) {
				return of(this.mapFreezerContents[freezerId]);
			}

			this.spinnerEvent.emit(true);
			return this.backendService.getAliments(freezerId).pipe(
				this.shutDownSpinner(),
				map((aliments: Aliment[]) => {
					return this.mapFreezerContents[freezerId] = aliments;
				})
			);
		}

		addAliment(freezerId: number, alimentToAdd: Aliment): Observable<Aliment> {
			return this.getFreezerContent(freezerId).pipe(
				switchMap((freezerContent: Aliment[]) => {
					this.spinnerEvent.emit(true);
					return this.backendService.saveAliment(freezerId, alimentToAdd).pipe(
						this.shutDownSpinner(),
						tap((alimentWithid: Aliment) => {
							freezerContent.unshift(alimentWithid);
						})
					);
				})
			);
		}

		editAliment(freezerId: number, alimentWithUpdates: Aliment): Observable<Aliment>  {
			return this.getFreezerContent(freezerId).pipe(
				switchMap((freezerContent: Aliment[]) => {
					this.spinnerEvent.emit(true);
					return this.backendService.updateAliment(freezerId, alimentWithUpdates).pipe(
						this.shutDownSpinner(),
						tap((alimentWithUpdates: Aliment) => {
							Object.assign(freezerContent.find(alim => alim.id == alimentWithUpdates.id), alimentWithUpdates);
						})
					);
				})
			);

		}

		deleteAliment(freezerId: number, alimentToDelete: Aliment): Observable<Object> {
			return this.getFreezerContent(freezerId).pipe(
				switchMap((freezerContent: Aliment[]) => {
					this.spinnerEvent.emit(true);
					return this.backendService.deleteAliment(freezerId, alimentToDelete).pipe(
						this.shutDownSpinner(),
						tap((alimentWithUpdates: Aliment) => {
							freezerContent.splice(freezerContent.findIndex(elem => elem.id == alimentToDelete.id), 1);
						})
					);
				})
			);
		}
}
