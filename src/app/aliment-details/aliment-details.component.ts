import {
	Component, OnInit, Input
} from '@angular/core';
import { DataService } from '../Services/data.service';


import { Aliment } from '../Class/Aliment';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

	startCrossAnimation_edit: Boolean = false;
	startCrossAnimation_delete: Boolean = false;

	constructor(private router: Router, private dataService: DataService) {
	}

	ngOnInit() {
	}

	navigateToEdit(): void {
		this.dataService.alimentToEdit = this.aliment;
		this.router.navigate(['edit-aliment']);
	}

	delete(): void {
		this.dataService.deleteAliment(this.aliment);
	}

}
