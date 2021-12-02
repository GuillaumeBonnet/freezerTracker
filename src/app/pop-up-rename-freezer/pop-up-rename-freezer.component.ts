import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../Services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpFreezerMenuComponent } from '../pop-up-freezer-menu/pop-up-freezer-menu.component';

@Component({
	selector: 'app-pop-up-rename-freezer',
	templateUrl: './pop-up-rename-freezer.component.html',
	styleUrls: ['./pop-up-rename-freezer.component.scss']
})
export class PopUpRenameFreezerComponent implements OnInit {

	isNameEmpty:Boolean = false;

	constructor(private dataService: DataService, public dialogRef: MatDialogRef<PopUpFreezerMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
	}

	renameFreezer(lastNameInput: HTMLInputElement) {
		if(!lastNameInput.value || lastNameInput.value == '') {
			lastNameInput.className += ' gs-current-input__input--invalid';
			return;
		}

		let freezerWithUpdate = Object.assign({}, this.data.freezer);
		freezerWithUpdate.name = lastNameInput.value;
		this.dataService.editFreezer(freezerWithUpdate).subscribe({
			next: () => {
				this.dialogRef.close(true);
			},
			error: () => {
				this.dialogRef.close(true);
			}
		});
	}

	closeRenamePopUp() {
		this.dialogRef.close();
	}

}
