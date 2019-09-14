import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { BackendService } from '../Services/backend.service';
import { Freezer } from '../Class/Freezer';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { PopUpFreezerMenuComponent } from '../pop-up-freezer-menu/pop-up-freezer-menu.component';



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

	constructor(private dataService: DataService, private backendService: BackendService, private router: Router, public dialog: MatDialog) { }

	freezers: Freezer[];
	isCreatingANewFreezer: Boolean = false;
	newFreezerName: string = '';
	isNameEmpty: Boolean = false;

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

		let selectedFreezerId: number =  parseInt((event.target as HTMLButtonElement).dataset.index);
		const dialogRef = this.dialog.open(PopUpFreezerMenuComponent, {
			width: '250px',
			panelClass: 'gs-popup',
			data: {selectedFreezer: this.freezers[selectedFreezerId]}
		});

		dialogRef.afterClosed().subscribe(result => {
			//gboTodo: change view if main freeezer selected
			console.log('The dialog was closed');
			console.log('todo debug:[result]', result);
		});
	}
}
