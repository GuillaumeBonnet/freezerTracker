import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { HttpClient} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Freezer } from '../Class/Freezer';
import { UserInfo } from '../Class/UserInfo';
import { map } from 'rxjs/operators';
import { BackendService } from './backend.service';

/* -------------------------------------------------------------------------- */
/*                  File is going to be a hassle to maintain                  */
/* -------------------------------------------------------------------------- */

@Injectable()
export class BackendServiceMocked implements BackendService {

	listAliments: Aliment[];
	apiRoot: string = 'urlMockedBackEndService';
	options = { headers: { 'Content-Type': 'application/json' } };

	constructor() { }

	/* -------------------------------------------------------------------------- */
	/*                               Mock variables                               */
	/* -------------------------------------------------------------------------- */
	isLoggedIn = false;

	freezers: Freezer[] = [
		new Freezer({name:'home freezer', id:1})
		, new Freezer({name:'garage freezer', id:2})
		, new Freezer({name:'beer freezer', id:3})
		, new Freezer({name:'summer pool freezer', id:4})
	];

	freezerIdToContentMap = {
		1: [
			new Aliment({id:1, name:'biscuits petit beurre', category:'snacks', iconicFontName:'icon-batch1_biscuit', quantity:12, quantityUnit:'pieces', storedDate:new Date('2019-07-08'), expirationDate:new Date('2019-07-10') })
			, new Aliment({id:2, name:'camembert', category:'snacks', iconicFontName:'icon-batch1_cheese', quantity:1, quantityUnit:'pieces', storedDate:new Date('2019-07-08'), expirationDate:new Date('2019-07-10'), })
		],
		2: [
			new Aliment({id:3, name:'fromages blancs', category:'milk product', iconicFontName:'icon-batch1_milk-1', quantity:1, quantityUnit:'pieces', storedDate:new Date('2019-07-08'), expirationDate:new Date('2019-07-10'), })
		],
		3: [
			new Aliment({id:4, name:'beer', category:'boissons', iconicFontName:'icon-batch1_water-1', quantity:6, quantityUnit:'bottles', storedDate:new Date('2019-07-08'), expirationDate:new Date('2019-07-10'), })
		],
		4: [
		],
		'indexAliment': 4
	};

	/* -------------------------------------------------------------------------- */
	/*                                    Users                                   */
	/* -------------------------------------------------------------------------- */

	getUserInfo(): Observable<UserInfo> { // UserInfo
		console.log("========= BACK-END CALL: getUserInfo() =========");
		if(!this.isLoggedIn) {
			return throwError(new Error('mocked getUserInfo error 500.'));
		}
		let mockedUserInfo: UserInfo = new UserInfo();
		mockedUserInfo.email = 'mockedUserEmail@';
		mockedUserInfo.username = 'mockedUsername';

		return of( JSON.parse(JSON.stringify(mockedUserInfo)) );
	}

	login(username: string, password: string): Observable<Object> {
		let body = {
			username: username,
			password: password,
		}

		if(username == 'guest' && password == 'guest-password') {
			this.isLoggedIn = true;
			return of(null);
		}
		else {
			return throwError(new Error('User mocked login failed.'));
		}

	}

	logout(): Observable<Object> {
		console.log("========= BACK-END CALL: logout() =========");
		this.isLoggedIn = false;
		return of(null);
	}

	register(registrationInfo: {username: string, password: string, matchingPassword: string, email: string}): Observable<Object> {
		return of(null);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Freezers                                  */
	/* -------------------------------------------------------------------------- */

	getFreezers(): Observable<Freezer[]> {
		console.log("========= BACK-END CALL: getFreezers() =========");
		if(this.isLoggedIn) {
			return of( JSON.parse(JSON.stringify(this.freezers)) )
				.pipe(
					map( (jsonBody: Freezer[]) => jsonBody )
				)
			;
		}
		else {
			return throwError(new Error('getFreezers() not logged in.'));
		}

	}

	saveFreezer(name: string): Observable<Freezer> {
		console.log("========= BACK-END CALL: saveFreezer() =========");
		if(this.isLoggedIn) {
			let newFreezer: Freezer = new Freezer({name:name, id: this.freezers.length + 1});
			this.freezers.push(newFreezer);
			return of( JSON.parse(JSON.stringify(newFreezer)) );
		}
		else {
			return throwError(new Error('saveFreezer() not logged in.'));
		}
	}

	deleteFreezer(freezerToDelete: Freezer): Observable<Object> {
		console.log("========= BACK-END CALL: deleteFreezer() =========");
		if(this.isLoggedIn) {
			if( this.freezers.slice(this.freezers.findIndex((freezer: Freezer) => freezer.id == freezerToDelete.id)) ) {
				return of(null);
			}
			else {
				return throwError(new Error('Freezer could not be deleted'));
			}
		}
		else {
			return throwError(new Error('deleteFreezer() not logged in.'));
		}
	}

	updateFreezer(freezerToUpdate: Freezer): Observable<Freezer> {
		console.log("========= BACK-END CALL: updateFreezer() =========");
		if(this.isLoggedIn) {
			let updateFreezerIndex = this.freezers.findIndex((freezer: Freezer) => freezer.id == freezerToUpdate.id);
			if( updateFreezerIndex ) {
				this.freezers[updateFreezerIndex] = freezerToUpdate;
				return of( JSON.parse(JSON.stringify(freezerToUpdate)) );
			}
			else {
				return throwError(new Error('updateFreezer() failed.'));
			}
		}
		else {
			return throwError(new Error('updateFreezer() not logged in.'));
		}
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Aliments                                  */
	/* -------------------------------------------------------------------------- */

	getAliments(freezerId: number): Observable<Aliment[]> {
		console.log("========= BACK-END CALL: getAliments() =========");
		if(this.isLoggedIn) {
			let content = this.freezerIdToContentMap[freezerId];
			if(content) {
				return of( JSON.parse(JSON.stringify(content)) );
			}
			else {
				return throwError(new Error('could not get content'));
			}
		}
		else {
			return throwError(new Error('getAliments() not logged in.'));
		}
	}

	saveAliment(freezerId: number, alimentToSave: Aliment): Observable<Aliment> {
		console.log("========= BACK-END CALL: saveAliment() =========");
		if(this.isLoggedIn) {
			let content = this.freezerIdToContentMap[freezerId];
			if(!content) {
				content = [];
			}
			this.freezerIdToContentMap.indexAliment++;
			alimentToSave.id = this.freezerIdToContentMap.indexAliment;
			content.push(alimentToSave);
			return of( JSON.parse(JSON.stringify(alimentToSave)) );
		}
		else {
			return throwError(new Error('saveAliment() not logged in.'));
		}
	}

	updateAliment(freezerId: number, alimentToUpdate: Aliment): Observable<Aliment> {
		console.log("========= BACK-END CALL: updateAliment() =========");
		if(this.isLoggedIn) {
			let content: Aliment[] = this.freezerIdToContentMap[freezerId];
			let alimentInMap: Aliment;
			if(content) {
				alimentInMap = content.find((aliment) => aliment.id == alimentToUpdate.id);
			}

			if(alimentInMap) {
				alimentInMap = alimentToUpdate;
				return of(alimentInMap);
			}
			else {
				return throwError(new Error('error in updating aliment.'));
			}
		}
		else {
			return throwError(new Error('updateAliment() not logged in.'));
		}
	}

	deleteAliment(freezerId: number, alimentToDelete: Aliment): Observable<Object> {
		console.log("========= BACK-END CALL: deleteAliment() =========");
		if(this.isLoggedIn) {
			let content: Aliment[] = this.freezerIdToContentMap[freezerId];
			let indexOfalimentInMap: number;

			if(content) {
				indexOfalimentInMap = content.findIndex((aliment) => aliment.id == alimentToDelete.id);
			}

			if(typeof indexOfalimentInMap === 'number' && indexOfalimentInMap != -1) {
				content.splice(indexOfalimentInMap, 1);
				return of(null);
			}
			else {
				return throwError(new Error('error in deleting aliment.'));
			}
		}
		else {
			return throwError(new Error('updateAliment() not logged in.'));
		}
	}
}
