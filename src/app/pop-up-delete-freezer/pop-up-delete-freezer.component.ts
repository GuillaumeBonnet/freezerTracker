import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpFreezerMenuComponent } from '../pop-up-freezer-menu/pop-up-freezer-menu.component';

@Component({
	selector: 'app-pop-up-delete-freezer',
	templateUrl: './pop-up-delete-freezer.component.html',
	styleUrls: ['./pop-up-delete-freezer.component.scss']
})
export class PopUpDeleteFreezerComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<PopUpFreezerMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
	}

	deleteFreezer() {
		console.log('todo debug:[this.data.freezerId]', this.data.freezerId);
		this.dialogRef.close(true);
	}

	closeDeletePopUp() {
		this.dialogRef.close();
	}

}
