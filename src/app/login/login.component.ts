import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BackendService } from '../Services/backend.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(public router: Router, public fb: FormBuilder, public authGuard: AuthGuard, @Inject('BackendService') private backendService: BackendService) {
		this.loginForm = this.fb.group({
			username: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
			password: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
		});
	}

	ngOnInit() {
	}

	login() {
		if(this.loginForm.invalid) {
			for (var controlFormName in this.loginForm.controls) {
				this.loginForm.get(controlFormName).markAsDirty();
			}
			return;
		}

		let formVal = this.loginForm.value;

		this.backendService.login(formVal.username, formVal.password).subscribe({
			next: () => {
				this.router.navigateByUrl(this.authGuard.getRedirectionUrl());
			}, error: (error) => {
				console.log('error login', error);
			}
		});
	}

	goToRegistrationPage() {
		this.router.navigate(['registration']);
	}

	fillGuestInfo() {
		this.loginForm.setValue({
			username: 'guest',
			password: 'guest-password'
		});
	}

	goToForgottenPasswordPage() {
		this.router.navigate(['forgot-password']);
	}

}
