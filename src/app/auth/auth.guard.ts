import { Injectable } from '@angular/core'
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { DataService } from '../Services/data.service'
import { map, catchError } from 'rxjs/operators'
import { UserInfo } from '../Class/UserInfo'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private dataService: DataService) {}

	isLoggedIn = false
	redirectionUrl = '/freezers'

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> {
		if (this.isLoggedIn) {
			return of(true)
		}
		return this.dataService.getUserInfo().pipe(
			map((userInfo: UserInfo) => {
				this.isLoggedIn = true
				return true
			}),
			catchError((error, caught) => {
				console.log('error getUserInfo:', error)
				this.isLoggedIn = false
				this.redirectionUrl = state.url
				return of(this.router.parseUrl('/login'))
			})
		)
	}

	//Functions wrapper for easier jasmin spy in tests
	getRedirectionUrl() {
		return this.redirectionUrl
	}
	getIsLoggedIn() {
		return this.isLoggedIn
	}
	setIsLoggedIn(isLoggedIn: boolean) {
		this.isLoggedIn = isLoggedIn
	}
}
