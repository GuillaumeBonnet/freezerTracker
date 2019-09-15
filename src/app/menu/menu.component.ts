import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


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
	constructor(private router: Router, private location: Location) { }

	ngOnInit() {
	}

	navigate(clickEvt: Event, route: string): void {
		this.router.navigate([route]);
		clickEvt.stopPropagation();
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

}
