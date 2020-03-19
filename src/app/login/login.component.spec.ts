import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DataService } from '../Services/data.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

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
	let fakeReturnUrl: string = 'fake return url';
	let component: HTMLElement;
	let debugComponent: DebugElement;
	let routerSpy;
	let backendServiceSpy;
	let authGuardSpy;

	beforeEach(async(() => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
		backendServiceSpy = jasmine.createSpyObj('BackendService', ['login']);
		backendServiceSpy.login.and.callFake((username, password) => {
			if(username == 'userName2' && password == 'password2') {
				return of('fake success');
			}
			else {
				return throwError(new Error('login error'));
			}
		});
		authGuardSpy = jasmine.createSpyObj('AuthGuard', ['getRedirectionUrl']);
			authGuardSpy.getRedirectionUrl.and.returnValue(fakeReturnUrl);

		TestBed.configureTestingModule({
			declarations: [
				LoginComponent
				, TestHostComponent
			],
			providers:[
				{ provide: Router, useValue: routerSpy},
				{ provide: AuthGuard, useValue: authGuardSpy},
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
		component = fixture.nativeElement.querySelector('app-login');
		debugComponent = fixture.debugElement.query(By.css('app-login'));
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should log in', () => {
		let usernameInput: HTMLInputElement = component.querySelector('input#username');
		usernameInput.value = 'userName2';
		usernameInput.dispatchEvent(new Event('input'));

		// no password -> no querry
		let passwordInput: HTMLInputElement = component.querySelector('input#password');
		passwordInput.value = '';
		passwordInput.dispatchEvent(new Event('input'));
		let logButton:HTMLElement = component.querySelector('button#log-in-button');
		// logButton.click();
		// expect(backendServiceSpy.login).not.toHaveBeenCalled(); //TODO

		//wrong password -> error
		passwordInput.value = 'password3';
		passwordInput.dispatchEvent(new Event('input'));
		logButton.click();
		expect(backendServiceSpy.login).toHaveBeenCalled();
		expect(routerSpy.navigateByUrl).not.toHaveBeenCalled(); // error

		//good password -> succès
		passwordInput.value = 'password2';
		passwordInput.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		logButton.click();
		expect(backendServiceSpy.login).toHaveBeenCalled();
		expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(fakeReturnUrl); // success
	});
	it('register button should navigate to register page', () => {
		let registerButton: HTMLElement = component.querySelector('button#register-in-button');
		registerButton.click();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['registration']);
	});
	it('should fill out guest user info when guest button is clicked', () => {
		(component.querySelector('button#guest-button') as HTMLElement).click();
		let loginForm: FormGroup = debugComponent.componentInstance.loginForm;
		expect(loginForm.controls.username.value).toBe('guest');
		expect(loginForm.controls.password.value).toBe('guest-password');
	});
	it('reset password button should navigate to its page', () => {
		let resetPasswordButton: HTMLElement = component.querySelector('button#reset-password-button');
		resetPasswordButton.click();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['forgot-password']);
	});
});

