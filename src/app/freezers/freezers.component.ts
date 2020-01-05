import { Component, OnInit, Inject } from '@angular/core';
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

	constructor(private dataService: DataService, @Inject('BackendService') private backendService: BackendService, private router: Router, public dialog: MatDialog) { }

	freezers: Freezer[];
	isCreatingANewFreezer: Boolean = false;
	newFreezerName: string = '';
	isNameEmpty: Boolean = false;

	ngOnInit() {
		this.dataService.getFreezers()
		.subscribe({
			next: (freezers: Freezer[]) => {
				this.freezers = freezers;
			},
			error: (error) => {
				console.log('todo debug:[error getFreezer]', error);
			}
		})
	}

	navigateToFreezerContent(i: number) {
		this.router.navigate(['/freezers', this.freezers[i].id]);
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
		this.dataService.addFreezer(this.newFreezerName, () => {
			this.isCreatingANewFreezer = false;
		});
	}

	openSubMenu(event: MouseEvent) {
		event.stopPropagation();

		let selectedFreezerId: number =  parseInt((event.currentTarget as HTMLButtonElement).dataset.index);

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
