import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
	template: `
		<app-registration>
		</app-registration>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('RegistrationComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const dataServiceSpy = jasmine.createSpyObj('DataService', ['logout']);
		TestBed.configureTestingModule({
			declarations: [RegistrationComponent, TestHostComponent],
			providers: [
				FormBuilder,
				{provide: Router, useValue: routerSpy},
				{provide: DataService, useValue: dataServiceSpy},
			],
			imports: [
				ReactiveFormsModule
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-registration')
		expect(component).toBeTruthy();
	});
});


