import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DataService } from '../Services/data.service';

@Component({
	template: `
		<app-login>
		</app-login>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('LoginComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'parseUrl']);
		const backendServiceSpy = jasmine.createSpyObj('BackendService', ['login']);
		const dataServiceSpy = jasmine.createSpyObj('DataService', ['getUserInfo']);
		const authGuardSpy = jasmine.createSpyObj('AuthGuard', ['getRedirectionUrl']);

		TestBed.configureTestingModule({
			declarations: [
				LoginComponent
				, TestHostComponent
			],
			providers:[
				{ provide: Router, useValue: routerSpy},
				{ provide: AuthGuard, useValue: authGuardSpy},
				{ provide: DataService, useValue: dataServiceSpy},
				{provide: 'BackendService', useValue: backendServiceSpy},
				FormBuilder,
			],
			imports: [
				FormsModule,
				ReactiveFormsModule,
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-login')
		expect(component).toBeTruthy();
	});
});

