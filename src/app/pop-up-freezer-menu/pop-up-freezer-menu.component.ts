import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopUpDeleteFreezerComponent } from '../pop-up-delete-freezer/pop-up-delete-freezer.component';
import { PopUpRenameFreezerComponent } from '../pop-up-rename-freezer/pop-up-rename-freezer.component';

@Component({
	selector: 'app-pop-up-freezer-menu',
	templateUrl: './pop-up-freezer-menu.component.html',
	styleUrls: ['./pop-up-freezer-menu.component.scss']
})
export class PopUpFreezerMenuComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<PopUpFreezerMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

	ngOnInit() {

	}

	closeMenuPopUp() {
		this.dialogRef.close();
	}


	openDeletePopUp(): void {
		const dialogRef = this.dialog.open(PopUpDeleteFreezerComponent, {
			width: '200px',
			panelClass: 'gs-popup',
			data: {freezerId: this.data.selectedFreezer.id}
		});

		dialogRef.afterClosed().subscribe(hasValidatedDeletion => {
			if(hasValidatedDeletion) {
				//list of freezer will be updated because the view subscribe to an "freezers" observable/subject which will be updated by the data service.
				this.closeMenuPopUp();
			}
		});
	}

	openRenamePopUp(): void {
		const dialogRef = this.dialog.open(PopUpRenameFreezerComponent, {
			width: '200px',
			panelClass: 'gs-popup',
			data: {freezer: this.data.selectedFreezer}
		});

		dialogRef.afterClosed().subscribe(hasValidatedDeletion => {
			if(hasValidatedDeletion) {
				//list of freezer will be updated because the view subscribe to an "freezers" observable/subject which will be updated by the data service.
				this.closeMenuPopUp();
			}
		});
	}

}
