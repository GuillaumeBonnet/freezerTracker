import { Injectable } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { HttpClient, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Freezer } from '../Class/Freezer';
import { UserInfo } from '../Class/UserInfo';

@Injectable()
export class BackendService {

	listAliments: Aliment[];
	apiRoot: string = environment.API_ROOT_URL;
	options = { headers: { 'Content-Type': 'application/json' } }; //ToImprove interctor based

	constructor(private http: HttpClient) { }

	/* -------------------------------------------------------------------------- */
	/*                                    Users                                   */
	/* -------------------------------------------------------------------------- */

	getUserInfo(): Observable<Object> { // UserInfo
		return this.http.get(`${this.apiRoot}/users/info`);
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

	getFreezers(): Observable<Object> { //ToImprove:  Observable<Freezer>
		return this.http.get(`${this.apiRoot}/freezers`, this.options);
	}

	saveFreezer(name: String): Observable<Object> {
		return this.http.post(`${this.apiRoot}/freezers`, new Freezer(name), this.options);
	}

	deleteFreezer(freezerToDelete: Freezer): Observable<Object> {
		return this.http.delete(`${this.apiRoot}/freezers/${freezerToDelete.id}`, this.options);
	}

	updateFreezer(freezerToUpdate: Freezer): Observable<Object> {
		return this.http.put(`${this.apiRoot}/freezers/${freezerToUpdate.id}`, freezerToUpdate, this.options);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Aliments                                  */
	/* -------------------------------------------------------------------------- */

	getAliments(freezerId: Number): Observable<Object> {
		return this.http.get(`${this.apiRoot}/freezers/${freezerId}/aliments`, this.options);
	}

	saveAliment(freezerId: Number, alimentToSave: Aliment): Observable<Object> {
		return this.http.post(`${this.apiRoot}/freezers/${freezerId}/aliments`, alimentToSave, this.options);
	}

	updateAliment(freezerId: Number, alimentToUpdate: Aliment): Observable<Object> {
		console.log('todo debug:[alimentToUpdate.id]', alimentToUpdate.id);
		console.log('todo debug:[alimentToUpdate]', alimentToUpdate);

		return this.http.put(`${this.apiRoot}/freezers/${freezerId}/aliments/${alimentToUpdate.id}`, alimentToUpdate, this.options);
	}

	deleteAliment(freezerId: Number, alimentToDelete: Aliment): Observable<Object> {
		return this.http.delete(`${this.apiRoot}/freezers/${freezerId}/aliments/${alimentToDelete.id}`, this.options);
	}
}
