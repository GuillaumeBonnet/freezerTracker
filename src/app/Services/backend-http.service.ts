import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { HttpClient, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Freezer } from '../Class/Freezer';
import { UserInfo } from '../Class/UserInfo';
import { map } from 'rxjs/operators';
import { BackendService } from './backend.service';

@Injectable()
export class BackendServiceHttp implements BackendService {

	listAliments: Aliment[];
	apiRoot: string = environment.API_ROOT_URL;
	options = { headers: { 'Content-Type': 'application/json' } }; //ToImprove interctor based

	constructor(private http: HttpClient) { }

	/* -------------------------------------------------------------------------- */
	/*                                    Users                                   */
	/* -------------------------------------------------------------------------- */

	getUserInfo(): Observable<UserInfo> {
		return this.http.get(`${this.apiRoot}/users/info`)
			.pipe(
				map( (jsonBody: UserInfo) => jsonBody )
			)
		;
	}

	login(username: string, password: string): Observable<Object> {
		let body = {
			username: username,
			password: password,
		}
		return this.http.post(`${this.apiRoot}/users/login`, body);
	}

	logout(): Observable<Object> {
		return this.http.post(`${this.apiRoot}/users/logout`, null);
	}

	register(registrationInfo: {username: string, password: string, matchingPassword: string, email: string}): Observable<Object> {
		return this.http.post(`${this.apiRoot}/users/registration`, registrationInfo);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Freezers                                  */
	/* -------------------------------------------------------------------------- */

	getFreezers(): Observable<Freezer[]> {
		return this.http.get(`${this.apiRoot}/freezers`, this.options)
			.pipe(
				map( (jsonBody: Freezer[]) => jsonBody )
			)
		;
	}

	saveFreezer(name: string): Observable<Freezer> {
		return this.http.post(`${this.apiRoot}/freezers`, new Freezer({name:name}), this.options)
			.pipe(
				map( (jsonBody: Freezer) => jsonBody )
			)
		;
	}

	deleteFreezer(freezerToDelete: Freezer): Observable<Object> {
		return this.http.delete(`${this.apiRoot}/freezers/${freezerToDelete.id}`, this.options);
	}

	updateFreezer(freezerToUpdate: Freezer): Observable<Freezer> {
		return this.http.put(`${this.apiRoot}/freezers/${freezerToUpdate.id}`, freezerToUpdate, this.options)
			.pipe(
				map( (jsonBody: Freezer) => jsonBody )
			)
		;
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Aliments                                  */
	/* -------------------------------------------------------------------------- */

	getAliments(freezerId: number): Observable<Aliment[]> {
		return this.http.get(`${this.apiRoot}/freezers/${freezerId}/aliments`, this.options)
			.pipe(
				map( (jsonBody: Aliment[]) => jsonBody )
			)
		;
	}

	saveAliment(freezerId: number, alimentToSave: Aliment): Observable<Aliment> {
		return this.http.post(`${this.apiRoot}/freezers/${freezerId}/aliments`, alimentToSave, this.options)
			.pipe(
				map( (jsonBody: Aliment) => jsonBody )
			)
		;
	}

	updateAliment(freezerId: number, alimentToUpdate: Aliment): Observable<Aliment> {
		return this.http.put(`${this.apiRoot}/freezers/${freezerId}/aliments/${alimentToUpdate.id}`, alimentToUpdate, this.options)
			.pipe(
				map( (jsonBody: Aliment) => jsonBody )
			)
		;
	}

	deleteAliment(freezerId: number, alimentToDelete: Aliment): Observable<Object> {
		return this.http.delete(`${this.apiRoot}/freezers/${freezerId}/aliments/${alimentToDelete.id}`, this.options);
	}
}
