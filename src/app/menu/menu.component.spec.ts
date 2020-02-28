import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { MenuItemComponent } from './menu-item/menu-item.component';
import {Location} from '@angular/common';

@Component({
	template: `
		<app-menu>
		</app-menu>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('MenuComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const locationSpy = jasmine.createSpyObj('Location', ['back', 'forward']);
		const backendServiceSpy = jasmine.createSpyObj('BackendService', ['logout']);
		const authGuardSpy = jasmine.createSpyObj('AuthGuard', ['getIsLoggedIn']);
		const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['deleteAll']);
		TestBed.configureTestingModule({
			declarations: [MenuComponent, TestHostComponent, MenuItemComponent],
			providers: [
				{provide: Router, useValue: routerSpy},
				{provide: 'BackendService', useValue: backendServiceSpy},
				{provide: AuthGuard, useValue: authGuardSpy},
				{provide: CookieService, useValue: cookieServiceSpy},
				{provide: Location, useValue: locationSpy},
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-menu')
		expect(component).toBeTruthy();
	});
});

