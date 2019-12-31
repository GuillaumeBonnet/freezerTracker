import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { UserInfo } from '../Class/UserInfo';
import { DataService } from '../Services/data.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	constructor(private cookieService: CookieService, private dataService: DataService) { }

	isLoggedIn = false;

  // store the URL so we can redirect after logging in
	redirectUrl: string;

	login(): Observable<boolean> {
		return null;
	}

	logout(): void {
		this.isLoggedIn = false;
		//callout log out
		// finally
		this.cookieService.delete('JSESSIONID');
		this.cookieService.delete('XSRF-TOKEN');
	}
}
