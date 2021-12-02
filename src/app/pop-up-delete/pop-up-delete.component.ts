import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpFreezerMenuComponent } from '../pop-up-freezer-menu/pop-up-freezer-menu.component';
import { DataService } from '../Services/data.service';
import { Aliment } from '../Class/Aliment';
import { Freezer } from '../Class/Freezer';
import { Observable, Observer, PartialObserver } from 'rxjs';

@Component({
	selector: 'app-pop-up-delete',
	templateUrl: './pop-up-delete.component.html',
	styleUrls: ['./pop-up-delete.component.scss']
})
export class PopUpDeleteComponent implements OnInit {

	constructor(private dataService: DataService, public dialogRef: MatDialogRef<PopUpFreezerMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: {freezerId: number, alimentId: number}) { }

	ngOnInit() {
	}

	delete() {
		let deleteResourceObsertver: PartialObserver<Object> = {
			next: () => {
				this.dialogRef.close(true);
			},
			error: (error) => {
				console.log('error delete freezer:', error);
				this.dialogRef.close(false);
			}
		};
		if(this.data.alimentId) {
			this.dataService.deleteAliment(this.data.freezerId, new Aliment({id: this.data.alimentId}))
				.subscribe(deleteResourceObsertver);
			}
		else {
			this.dataService.deleteFreezer(this.data.freezerId)
				.subscribe(deleteResourceObsertver);
		}
	}

	closeDeletePopUp() {
		this.dialogRef.close();
	}

}
