import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { BackendService } from '../Services/backend.service';
import { Freezer } from '../Class/Freezer';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';



@Component({
	selector: 'app-freezers',
	templateUrl: './freezers.component.html',
	styleUrls: ['./freezers.component.scss'],
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
	],
})
export class FreezersComponent implements OnInit {

	constructor(private dataService: DataService, private backendService: BackendService, private router: Router) { }

	freezers: Freezer[];
	isCreatingANewFreezer: Boolean = false;
	newFreezerName: string = '';
	isNameEmpty: Boolean = false;
	isSubMenuOppened: Boolean = false;
	subMenuTargetId: Number;

	ngOnInit() {
		this.backendService.getFreezers().subscribe({
			next: (data) => {
				console.log('todo debug:[data]', data);
				this.freezers = <Freezer[]>data;
			},
			error: (error) => {
				console.log('todo debug:[error]', error);
			}
		})
	}

	navigateToFreezerContent(i) {
		console.log('navigateToFreezerContent', this.freezers[i].id);
		this.dataService.loadAliments(this.freezers[i].id)
			.then(() => {
				this.router.navigate(['']);
			})
			.catch((error) => {
				console.log('todo debug:[error]');
			});
	}

	initiateFreezerCreation() {
		this.isCreatingANewFreezer = true;
	}

	cancelFreezerCreation() {
		this.isCreatingANewFreezer = false;
	}

	nameKeyUp(event: any) {
		console.log('todo debug:[toto]', event.target.value);

		if(event.target.value == '' && this.newFreezerName) {
			this.isNameEmpty = true;
		}

		if(this.isNameEmpty && event.target.value != '') {
			this.isNameEmpty = false;
		}

		this.newFreezerName = event.target.value;
		console.log('todo debug:[this.isNameEmpty]', this.isNameEmpty);
	}

	createFreezer() {
		this.backendService.saveFreezer(this.newFreezerName).subscribe({
			next: (result) => {
				this.freezers.unshift(<Freezer>result);
				console.log('todo debug:[this.freezers]', this.freezers);

				this.isCreatingANewFreezer = false;
			},
			error: (error) => {
				console.log("error", error);
			},
			complete: null
		});
	}

	openSubMenu(event: MouseEvent) {
		event.stopPropagation();
		this.subMenuTargetId = parseInt((event.target as HTMLButtonElement).dataset.index);
		console.log('todo debug:[event]', event);

		this.isSubMenuOppened = true;
		console.log('todo debug:[subMenuTargetId]', this.subMenuTargetId);

	}

	closeSubMenu() {
		this.isSubMenuOppened = false;
	}
}
