import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NewAlimentComponent } from './new-aliment.component';

/* -------------------------------------------------------------------------- */
/*                             Test Host Component                            */
/* -------------------------------------------------------------------------- */

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DataService } from '../Services/data.service';
import { of } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { query } from '@angular/animations';
import { By } from '@angular/platform-browser';
import { Aliment } from '../Class/Aliment';
import { first } from 'rxjs/operators';

@Component({
	template: `
		<app-new-aliment [isEdit]="isEdit">
		</app-new-aliment>`
})
class TestHostComponent {
	isEdit:Boolean = false;
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('NewAlimentComponent', () => {
	let freezerIdUrlParam = 2;
	let alimentIdUrlParam = 7;
	let alimentToFeedFormWith:Aliment = new Aliment({
		name:'name1'
		, iconicFontName:'iconicFontName1'
		, category:'category1'
		, storedDate: new Date('2019-07-08')
		, expirationDate: new Date('2019-07-08')
		, quantity: 1
		, quantityUnit: 'quantityUnit1'
	});
	let testHost: TestHostComponent;
	alimentToFeedFormWith.id = alimentIdUrlParam;
	let fixture: ComponentFixture<TestHostComponent>;
	let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
	let dataServiceSpy = jasmine.createSpyObj('DataService', ['getFreezerContent', 'editAliment', 'addAliment']);
	dataServiceSpy.addAliment.and.returnValue(of());
	let secondAlim = Object.assign({},alimentToFeedFormWith);
	secondAlim.name += '-secondAlim';
	dataServiceSpy.getFreezerContent.and.returnValue(of([alimentToFeedFormWith, secondAlim]));
	let component:HTMLElement;
	let stubedRoute = {params: of({freezerId: freezerIdUrlParam, alimentId: alimentIdUrlParam})};



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				NewAlimentComponent
				, TestHostComponent
			],
			providers:    [
				{provide: MatDialog}
				, { provide: Router, useValue: routerSpy}
				, { provide: DataService, useValue: dataServiceSpy}
				, {provide: ActivatedRoute, useValue: stubedRoute}
				, FormBuilder
				, MatFormFieldModule
			],
			imports: [
				ReactiveFormsModule
				, MatFormFieldModule
				, MatDatepickerModule
				, MatNativeDateModule
				, MatInputModule
				, BrowserAnimationsModule
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
		component = fixture.nativeElement.querySelector('app-new-aliment');
	}));

	/* -------------------------------------------------------------------------- */
	/*                                  New mode                                  */
	/* -------------------------------------------------------------------------- */
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should close the form when the cancel button is clicked', () => {
		let cancelButton:HTMLElement = component.querySelector('button#cancel-button');
		cancelButton.click();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['freezers', freezerIdUrlParam]);
	});
	it('should highlight the next formfield when the left arrow is clicked', () => {
		let nextFieldButton:HTMLElement = component.querySelector('button#next-field-button');
		let formFields: NodeListOf<HTMLElement> = component.querySelectorAll('[id^=form-field]');
		expect(formFields.length).toBe(6);
		expect(formFields.item(0).classList).toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		nextFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		nextFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		nextFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		nextFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		nextFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).toContain('mainbox__line--selected');

		nextFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');
	});
	it('should highlight the previous formfield when the left arrow is clicked', () => {
		let previousFieldButton:HTMLElement = component.querySelector('button#previous-field-button');
		let formFields: NodeListOf<HTMLElement> = component.querySelectorAll('[id^=form-field]');
		expect(formFields.length).toBe(6);
		expect(formFields.item(0).classList).toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		previousFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).toContain('mainbox__line--selected');

		previousFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		previousFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		previousFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		previousFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		previousFieldButton.click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');
	});
	it('should highlight a form field when clicked', () => {
		let formFields: NodeListOf<HTMLElement> = component.querySelectorAll('[id^=form-field]');
		expect(formFields.length).toBe(6);
		expect(formFields.item(0).classList).toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');

		(<HTMLElement>formFields.item(3).parentNode).click();
		fixture.detectChanges();
		expect(formFields.item(0).classList).not.toContain('mainbox__aliment--selected');
		expect(formFields.item(1).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(2).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(3).classList).toContain('mainbox__line--selected');
		expect(formFields.item(4).classList).not.toContain('mainbox__line--selected');
		expect(formFields.item(5).classList).not.toContain('mainbox__line--selected');
	});
	it('should prevent form validation and dirty the field when the form is validated too soon', () => {
		let submitButton:HTMLElement = component.querySelector('button#submit-button');
		let formFields: NodeListOf<HTMLElement> = component.querySelectorAll('[id^=form-field]');
		expect(formFields.length).toBe(6);

		formFields.forEach((field:HTMLElement) => {
			expect(field.className).not.toContain('--invalid');
		});

		submitButton.click();
		fixture.detectChanges();
		formFields = component.querySelectorAll('[id^=form-field]');
		expect(dataServiceSpy.addAliment).not.toHaveBeenCalled();

		expect(formFields.length).toBe(6);
		formFields.forEach((field:HTMLElement) => {
			expect(field.className).toContain('--invalid');
		});

	});
	it('should create a new aliment when the form is correctly filled and navigate to the page ', () => {
		let appNewAliment = fixture.debugElement.query(By.css('app-new-aliment')).componentInstance;
		expect(appNewAliment).toBeTruthy();

		expect(appNewAliment.alimentForm.status).toBe('INVALID');

		let formControls = appNewAliment.alimentForm.controls;
		formControls.name.setValue(alimentToFeedFormWith.name);
		formControls.icon.setValue(alimentToFeedFormWith.iconicFontName);
		formControls.category.setValue(alimentToFeedFormWith.category);
		formControls.storedDate.setValue(alimentToFeedFormWith.storedDate);
		formControls.expirationDate.setValue(alimentToFeedFormWith.expirationDate);
		formControls.quantityValue.setValue(alimentToFeedFormWith.quantity);
		formControls.quantityUnit.setValue(alimentToFeedFormWith.quantityUnit);

		expect(appNewAliment.alimentForm.status).toBe('VALID');

		(<HTMLElement>component.querySelector('button#submit-button')).click();
		alimentToFeedFormWith.id = undefined;
		expect(dataServiceSpy.addAliment).toHaveBeenCalledWith(freezerIdUrlParam, alimentToFeedFormWith);
		// expect(routerSpy.navigate).toHaveBeenCalledWith(['freezers', freezerIdUrlParam]);
	});

	/* -------------------------------------------------------------------------- */
	/*                                  Edit mode                                 */
	/* -------------------------------------------------------------------------- */

	it('should create comp in edit mode', () => {

		let appNewAliment = fixture.debugElement.query(By.css('app-new-aliment')).componentInstance;
		expect(appNewAliment).toBeTruthy();
		appNewAliment.isEdit = true;
		appNewAliment.ngOnInit();

		expect(appNewAliment.alimentForm.status).toBe('VALID');
		let formControls = appNewAliment.alimentForm.controls;
		formControls.name.setValue('changedName');

		expect(appNewAliment.alimentForm.status).toBe('VALID');

		(<HTMLElement>component.querySelector('button#submit-button')).click();

		alimentToFeedFormWith.name = 'changedName';
		alimentToFeedFormWith.id = alimentIdUrlParam;
		expect(dataServiceSpy.editAliment).toHaveBeenCalledWith(freezerIdUrlParam, alimentToFeedFormWith);
		// expect(routerSpy.navigate).toHaveBeenCalledWith(['freezers', freezerIdUrlParam]);
	});
});
