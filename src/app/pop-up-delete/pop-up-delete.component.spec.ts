import { TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Freezer } from '../Class/Freezer';
import { PopUpDeleteComponent } from './pop-up-delete.component';
import { DataService } from '../Services/data.service';

@NgModule({
	imports: [MatDialogModule, NoopAnimationsModule],
	exports: [PopUpDeleteComponent],
	declarations: [PopUpDeleteComponent],
	entryComponents: [PopUpDeleteComponent],
})
class DialogTestModule { }

describe('PopUpDeleteComponent', () => {
	let dialog: MatDialog;
	let overlayContainerElement: HTMLElement;
	let dataServiceSpy = jasmine.createSpyObj('DataService', ['deleteAliment',	'deleteFreezer']);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ DialogTestModule ],
			providers: [
				{
					provide: OverlayContainer,
					useFactory: () => {
						overlayContainerElement = document.createElement('div');
						return { getContainerElement: () => overlayContainerElement };
					},
				},
				{provide: DataService, useValue: dataServiceSpy},
			]
		});

		dialog = TestBed.get(MatDialog);
	});

	it('shows information without details', () => {
		dialog.open(
			PopUpDeleteComponent
			, {
				width: '250px',
				panelClass: 'gs-popup',
				data: {
					freezerId: 1,
					alimentId: 2,
				}
			}
		);
		let component = overlayContainerElement.querySelector('app-pop-up-delete')
		expect(component).toBeTruthy();
	});
});
