import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BackendService } from '../Services/backend.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	registerForm: FormGroup;
	isAwaitingConfirmation: boolean = false;

	constructor(public router: Router, fb: FormBuilder, public authGuard: AuthGuard, private backendService: BackendService) {

		this.registerForm = fb.group({
			username: fb.control('', [Validators.required, Validators.maxLength(250)]),
			email: fb.control('', [Validators.required, Validators.maxLength(250), Validators.email]),
			password: fb.control('', [Validators.required, Validators.maxLength(250)]),
			passwordVerification: fb.control('', [Validators.required, Validators.maxLength(250)]),
		}
		, {
			validators: (registerForm: FormGroup) => {
				if( registerForm.controls['password'].value === registerForm.controls['passwordVerification'].value ) {
					return null;
				}
				else {
					registerForm.controls['passwordVerification']
					return {
						value: 'passwordMatching'
					};
				}
			},
			updateOn: 'change'
		}
		);
	}

	ngOnInit() {
	}

	register() {
		if(this.registerForm.invalid) {
			for (var controlFormName in this.registerForm.controls) {
				this.registerForm.get(controlFormName).markAsDirty();
			}
			return;
		}

		let formVal = this.registerForm.value;
		let registrationInfo = {
			username: formVal.username,
			email: formVal.email,
			password: formVal.password,
			matchingPassword: formVal.passwordVerification
		};

		this.backendService.register(registrationInfo).subscribe({
			next: () => {
				this.isAwaitingConfirmation = true;
			}, error: (error) => {
				console.log('error registration', error);
			}
		});
	}

	isShowingInvalid(formControlName: string): Boolean {
		let formControl: AbstractControl = null;

		if (this.registerForm) {
			formControl = this.registerForm.get(formControlName);
			if (formControl && formControl.dirty) {
				return formControl.invalid;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

}
