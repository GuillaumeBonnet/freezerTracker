import { TestBed } from '@angular/core/testing';

import { PopUpRenameFreezerComponent } from './pop-up-rename-freezer.component';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Freezer } from '../Class/Freezer';
import { DataService } from '../Services/data.service';

@NgModule({
	imports: [MatDialogModule, NoopAnimationsModule],
	exports: [PopUpRenameFreezerComponent],
	declarations: [PopUpRenameFreezerComponent],
	entryComponents: [PopUpRenameFreezerComponent],
})
class DialogTestModule { }

describe('PopUpRenameFreezerComponent', () => {
	let dialog: MatDialog;
	let overlayContainerElement: HTMLElement;
	const spyDataService = jasmine.createSpyObj('DataService', ['editFreezer']);
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ DialogTestModule ],
			providers: [
				{
					provide: OverlayContainer, useFactory: () => {
						overlayContainerElement = document.createElement('div');
						return { getContainerElement: () => overlayContainerElement };
					},
				},
				{provide: DataService, useValue: spyDataService},
			]
		});

		dialog = TestBed.get(MatDialog);
	});

	it('shows information without details', () => {
		dialog.open(
			PopUpRenameFreezerComponent
			, {
				width: '250px',
				panelClass: 'gs-popup',
				data: {freezer: new Freezer({name:'name'})}
			}
		);
		let component = overlayContainerElement.querySelector('app-pop-up-rename-freezer')
		expect(component).toBeTruthy();
	});
});
