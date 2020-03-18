import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezersComponent } from './freezers.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { Freezer } from '../Class/Freezer';
import { PopUpFreezerMenuComponent } from '../pop-up-freezer-menu/pop-up-freezer-menu.component';

@Component({
	template: `
		<app-freezers>
		</app-freezers>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('FreezersComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;
	let component: HTMLElement;
	let fakeFreezers: Freezer[] = [ new Freezer({name: "name"}), new Freezer({name: "name2"})];
	let routerSpy;
	let dataServiceSpy;
	let matDialogSpy;


	beforeEach(async(() => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		dataServiceSpy = jasmine.createSpyObj('DataService', ['getFreezers', 'addFreezer']);
			dataServiceSpy.getFreezers.and.returnValue(of(fakeFreezers));
		matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
			matDialogSpy.open.and.returnValue({afterClosed: () => {
				return of("fake result");
			}});
		TestBed.configureTestingModule({
			declarations: [
				FreezersComponent
				, TestHostComponent
			],
			providers:    [
				{provide: MatDialog, useValue: matDialogSpy}
				, { provide: Router, useValue: routerSpy}
				, { provide: DataService, useValue: dataServiceSpy}
			],
			imports: [
				MatCardModule
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		component = fixture.nativeElement.querySelector('app-freezers');
		fixture.detectChanges();
	}));

	it('should creates', () => {
		expect(component).toBeTruthy();
	});
	it('should display the freezer list', () => {
		let alimentCards = component.querySelectorAll('li.aliment-card');
		expect(alimentCards.length).toBe(fakeFreezers.length + 1); //+1 for the "create freezer card"
		expect(alimentCards[1].textContent.trim()).toBe(fakeFreezers[0].name);
		expect(alimentCards[2].textContent.trim()).toBe(fakeFreezers[1].name);
	});
	it('should open a freezer menu popup for the right freezer', () => {
		let alimentCards = component.querySelectorAll('li.aliment-card');
		alimentCards[1].querySelector('button').click();
		expect(matDialogSpy.open).toHaveBeenCalledWith(PopUpFreezerMenuComponent, {
			width: '250px',
			panelClass: 'gs-popup',
			data: {selectedFreezer: fakeFreezers[0]}
		})
	});
	it('should display the "new freezer" card and tests its functionnality', () => {
		// starting state = no text input
		let newFreezerCard:HTMLElement = component.querySelector('li.aliment-card');
		let nameInput = newFreezerCard.querySelector('input');
		expect(nameInput).toBeFalsy();

		//should display the name input when clicked
		newFreezerCard.click();
		fixture.detectChanges();
		newFreezerCard = component.querySelector('li.aliment-card');
		nameInput = newFreezerCard.querySelector('input');
		expect(nameInput).toBeTruthy();
		nameInput.value = 'freezer name';

		// should hide the name input when cancel button is clicked
		let cancelButton = newFreezerCard.querySelectorAll('button')[0];
		cancelButton.click();
		fixture.detectChanges();
		newFreezerCard = component.querySelector('li.aliment-card');
		nameInput = newFreezerCard.querySelector('input');
		expect(nameInput).toBeFalsy();

		// should display name input again and create freezer
		newFreezerCard.click();
		fixture.detectChanges();
		newFreezerCard = component.querySelector('li.aliment-card');
		nameInput = newFreezerCard.querySelector('input');
		expect(nameInput).toBeTruthy();
		nameInput.value = 'new freezer name';
		nameInput.dispatchEvent(new Event('keyup'));
		fixture.detectChanges();
		let createFreezerButton = newFreezerCard.querySelectorAll('button')[1];
		createFreezerButton.click();
		fixture.detectChanges();
		expect(dataServiceSpy.addFreezer.calls.first().args[0]).toBe('new freezer name');
	});
	it('should navigate to the freezer clicked', () => {
		let alimentCards = component.querySelectorAll('li.aliment-card');
		(<HTMLElement>alimentCards[1]).click();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['/freezers', fakeFreezers[0].id]);
	});
});
