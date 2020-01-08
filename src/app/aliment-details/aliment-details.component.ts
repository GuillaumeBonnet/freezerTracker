import {
	Component, OnInit, Input
} from '@angular/core';
import { DataService } from '../Services/data.service';


import { Aliment } from '../Class/Aliment';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';

@Component({
	selector: 'app-aliment-details',
	templateUrl: './aliment-details.component.html',
	styleUrls: ['./aliment-details.component.scss']
})
export class AlimentDetailsComponent implements OnInit {

	//either input is aliment and this component is used as a detail showcase
	// else the input is only a form group and it's used when editing or createing a new aliment
	@Input()
	aliment: Aliment = new Aliment();

	@Input()
	freezerId: number;

	startCrossAnimation_edit: Boolean = false;
	startCrossAnimation_delete: Boolean = false;

	constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute, public dialog: MatDialog) {
	}

	ngOnInit() {
	}

	navigateToEdit(): void {
		this.router.navigate(['edit-aliment', this.aliment.id], {relativeTo: this.route});
	}

	delete(event: MouseEvent): void {
		const dialogRef = this.dialog.open(PopUpDeleteComponent, {
			width: '200px',
			panelClass: 'gs-popup',
			data: {freezerId: this.freezerId, alimentId: this.aliment.id}
		});

		dialogRef.afterClosed().subscribe(hasValidatedDeletion => {
			if(hasValidatedDeletion) {
				this.router.navigate(['/freezers', this.freezerId]);
			}
			else if(typeof hasValidatedDeletion == 'boolean' && !hasValidatedDeletion) {
				console.log('error in deletion of aliment after pop-up');
				this.router.navigate(['/freezers', this.freezerId]);
			}
		});
	}

}
