import { Component, OnInit } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { BackendService } from '../Services/backend.service';
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-pageMyFreezer',
	templateUrl: './pageMyFreezer.component.html',
	styleUrls: ['./pageMyFreezer.component.scss']
})
export class PageMyFreezerComponent implements OnInit {

	listAliments: Aliment[];
	indexSelectedAliment: number = 0;
	selectedAliment: Aliment;
	startCrossAnimation: Boolean = false;

	constructor(public router: Router, private dataService: DataService) { }

	ngOnInit() {
		this.dataService.getAlimentSubject().subscribe(
			data => {
				this.listAliments = data;
				this.selectedAliment = this.listAliments && this.listAliments.length >= 1 ? this.listAliments[0] : null;
			},
			error => {
				console.log("error", error);
			}
		);
		this.listAliments = this.dataService.listAliments;
		this.posElementSelected(0);
	}

	posElementSelected(event: number) {
		this.indexSelectedAliment = event;
		this.selectedAliment = this.listAliments[event];
	}
}
