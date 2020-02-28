import { TestBed } from '@angular/core/testing';

import { PopUpFreezerMenuComponent } from './pop-up-freezer-menu.component';
import { NgModule } from '@angular/core';
import { Freezer } from '../Class/Freezer';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [MatDialogModule, NoopAnimationsModule],
	exports: [PopUpFreezerMenuComponent],
	declarations: [PopUpFreezerMenuComponent],
	entryComponents: [PopUpFreezerMenuComponent],
})
class DialogTestModule { }

describe('PopUpFreezerMenuComponent', () => {
	let dialog: MatDialog;
	let overlayContainerElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ DialogTestModule ],
			providers: [
				{
					provide: OverlayContainer, useFactory: () => {
						overlayContainerElement = document.createElement('div');
						return { getContainerElement: () => overlayContainerElement };
					}
				}
			]
		});

		dialog = TestBed.get(MatDialog);
	});

	it('shows information without details', () => {
		dialog.open(
			PopUpFreezerMenuComponent
			, {
				width: '250px',
				panelClass: 'gs-popup',
				data: {selectedFreezer: new Freezer({name:'name'})}
			}
		);
		let component = overlayContainerElement.querySelector('app-pop-up-freezer-menu')
		expect(component).toBeTruthy();
	});
});
