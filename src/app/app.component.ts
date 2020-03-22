import { Component, OnInit } from '@angular/core';
import { DataService } from './Services/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(private dataService: DataService) {
		this.dataService.spinnerEvent.subscribe({
			next: (isSpinnerDisplayed: Boolean) => {
				Promise.resolve(null).then(() => {
					this.isSpinnerDisplayed = isSpinnerDisplayed;
				});
			}
		});
	}

	ngOnInit() {
	}

	title = 'app';
	isSpinnerDisplayed: Boolean = false;
}
