import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(public router: Router, fb: FormBuilder, public authService: AuthService) {
		this.loginForm = fb.group({
			username: fb.control('', [Validators.required, Validators.maxLength(250)]),
			password: fb.control('', [Validators.required, Validators.maxLength(250)]),
		});

		this.loginForm.setValue({
			username: 'guest',
			password: 'guest-password'
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
		console.log('gboDebug:[formVal]', formVal.username);
		console.log('gboDebug:[formVal]', formVal.password);

		this.authService.login().subscribe(() => {
			if (this.authService.isLoggedIn) {
				// Get the redirect URL from our auth service
				// If no redirect has been set, use the default
				let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/freezers';
				// Redirect the user
				this.router.navigateByUrl(redirect);
			}
		});

	}

}
