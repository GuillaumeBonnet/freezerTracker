import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

@Component({
	template: `
		<app-new-aliment>
		</app-new-aliment>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('NewAlimentComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const dataServiceSpy = jasmine.createSpyObj('DataService', ['getFreezerContent', 'editAliment', 'addAliment']);
		const stubedRoute = new ActivatedRouteStub();
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
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-new-aliment')
		expect(component).toBeTruthy();
	});
});
