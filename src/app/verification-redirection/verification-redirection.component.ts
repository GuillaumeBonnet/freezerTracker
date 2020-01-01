import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router, Params, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs/operators';


@Component({
	selector: 'app-verification-redirection',
	templateUrl: './verification-redirection.component.html',
	styleUrls: ['./verification-redirection.component.scss']
})
export class VerificationRedirectionComponent implements OnInit {

	constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {

		this.route.paramMap.pipe(
			switchMap((paramMap: ParamMap) => {
				return this.http.post(`${environment.API_ROOT_URL}/users/confirm-registration`, paramMap.get('token'))
			})
		)
		.subscribe({
			next: (paramMap: ParamMap) => {
				this.router.navigate(['/freezers']);
			},
			error: (error) => {
				let errorMessage = 'The email verification was unsucessful.' // TODO: label
				console.log('[error confirm-registration]', error);
			},
		});
	}

	ngOnInit() {
	}

}
