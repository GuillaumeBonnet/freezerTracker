import { Component, OnInit, Inject } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { BackendService } from '../Services/backend.service';
import { AuthGuard } from '../auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	animations: [
		trigger('shadowing', [
			state('in', style({ opacity: 0 })),
			transition('void => *', [
				style({ opacity: 0 }),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({ opacity: 0 }))
			])
		])
	]
})
export class MenuComponent implements OnInit {

	isOpened: Boolean = false;
	constructor(
		private router: Router
		, private location: Location
		, @Inject('BackendService') private backendService: BackendService
		, public authGuard: AuthGuard
		, private cookieService : CookieService
	) { }

	ngOnInit() {
	}

	calculateAngle(input: {index: number, length: number}): number {
		let numberOfMenuItems: number = input.length;
		let deadAngle: number = 25;
		return deadAngle +  (input.index - 1) * (180-deadAngle-deadAngle)  / (numberOfMenuItems-1);
	}

	navigate(clickEvt: Event, route: string): void {
		clickEvt.stopPropagation();
		this.router.navigate([route]);
		this.isOpened = false
	}

	secondaryAction(actionToken: String) {
		if (actionToken == 'back') {
			this.location.back();
		}
		else if(actionToken == 'forward') {
			this.location.forward();
		}
	}

	logout(clickEvt: Event) {
		clickEvt.stopPropagation();
		this.backendService.logout().subscribe({
			complete: () => {
				this.cookieService.deleteAll(null, environment.DOMAIN);
				this.authGuard.setIsLoggedIn(false);
				this.router.navigate(['login']);
			}
		});
	}

}
