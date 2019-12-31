import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService }      from './auth.service';
import { DataService } from '../Services/data.service';
import { map, catchError } from 'rxjs/operators';
import { UserInfo } from '../Class/UserInfo';
import { BackendService } from '../Services/backend.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

	constructor(private router: Router, private dataService: DataService) {}

	isLoggedIn = false;

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
		if(this.isLoggedIn) {
			return of(true);
		}
		return this.dataService.getUserInfo().pipe(
			map((userInfo: UserInfo) => {
				this.isLoggedIn = true;
				return true;
			})
			, catchError((error, caught) => {
				this.isLoggedIn = false;
				return of(this.router.parseUrl('/login'));
			})
		);
	}
}
