import { Injectable } from '@angular/core'
import { Aliment } from '../Class/Aliment'
import { HttpClient, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Freezer } from '../Class/Freezer'
import { UserInfo } from '../Class/UserInfo'
import { map } from 'rxjs/operators'

export interface BackendService {
	listAliments: Aliment[]
	apiRoot: string
	options: any
	/* -------------------------------------------------------------------------- */
	/*                                    Users                                   */
	/* -------------------------------------------------------------------------- */

	getUserInfo(): Observable<UserInfo>

	login(username: string, password: string): Observable<Object>

	logout(): Observable<Object>

	register(registrationInfo: {
		username: string
		password: string
		matchingPassword: string
		email: string
	}): Observable<Object>

	/* -------------------------------------------------------------------------- */
	/*                                  Freezers                                  */
	/* -------------------------------------------------------------------------- */

	getFreezers(): Observable<Freezer[]>

	saveFreezer(name: string): Observable<Freezer>

	deleteFreezer(freezerToDelete: Freezer): Observable<Object>

	updateFreezer(freezerToUpdate: Freezer): Observable<Freezer>

	/* -------------------------------------------------------------------------- */
	/*                                  Aliments                                  */
	/* -------------------------------------------------------------------------- */

	getAliments(freezerId: number): Observable<Aliment[]>

	saveAliment(freezerId: number, alimentToSave: Aliment): Observable<Aliment>

	updateAliment(
		freezerId: number,
		alimentToUpdate: Aliment
	): Observable<Aliment>

	deleteAliment(
		freezerId: number,
		alimentToDelete: Aliment
	): Observable<Object>
}
