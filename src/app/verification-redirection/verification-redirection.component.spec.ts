import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationRedirectionComponent } from './verification-redirection.component';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { HttpClient } from '@angular/common/http';

@Component({
	template: `
		<app-verification-redirection>
		</app-verification-redirection>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('VerificationRedirectionComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
		const activatedRouteSpy = new ActivatedRouteStub();
		TestBed.configureTestingModule({
			declarations: [VerificationRedirectionComponent, TestHostComponent],
			providers: [
				{provide: Router, useValue: routerSpy},
				{provide: ActivatedRoute, useValue: activatedRouteSpy},
				{provide: HttpClient, useValue: httpClientSpy},
			],
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-verification-redirection')
		expect(component).toBeTruthy();
	});
});
