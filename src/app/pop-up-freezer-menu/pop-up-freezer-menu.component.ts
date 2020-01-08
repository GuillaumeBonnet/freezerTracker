import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';
import { PopUpRenameFreezerComponent } from '../pop-up-rename-freezer/pop-up-rename-freezer.component';
import { Freezer } from '../Class/Freezer';

@Component({
	selector: 'app-pop-up-freezer-menu',
	templateUrl: './pop-up-freezer-menu.component.html',
	styleUrls: ['./pop-up-freezer-menu.component.scss']
})
export class PopUpFreezerMenuComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<PopUpFreezerMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: {selectedFreezer: Freezer}, public dialog: MatDialog) { }

	ngOnInit() {

	}

	closeMenuPopUp() {
		this.dialogRef.close();
	}


	openDeletePopUp(): void {
		const dialogRef = this.dialog.open(PopUpDeleteComponent, {
			width: '200px',
			panelClass: 'gs-popup',
			data: {freezerId: this.data.selectedFreezer.id}
		});

		dialogRef.afterClosed().subscribe(hasValidatedDeletion => {
			if(hasValidatedDeletion) {
				this.closeMenuPopUp();
			}
			else if(typeof hasValidatedDeletion == 'boolean' && !hasValidatedDeletion) {
				this.closeMenuPopUp();
				//error deletion
			}
		});
	}

	openRenamePopUp(): void {
		const dialogRef = this.dialog.open(PopUpRenameFreezerComponent, {
			width: '200px',
			panelClass: 'gs-popup',
			data: {freezer: this.data.selectedFreezer}
		});

		dialogRef.afterClosed().subscribe({
			next: (hasValidatedDeletion: Boolean) => {
				if(hasValidatedDeletion) {
					this.closeMenuPopUp();
				}
			}
			, error: (error) => {
				console.log('error after PopUpRenameFreezerComponent was closed:', error);
			}
		});
	}

}
