import { Injectable } from '@angular/core'
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
	providedIn: 'root',
})
export class InterceptorXsrfHeaderWritterService implements HttpInterceptor {
	constructor(private cookieService: CookieService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const secureReq = req.clone({
			headers: req.headers.set(
				'X-XSRF-TOKEN',
				this.cookieService.get('XSRF-TOKEN')
			),
			withCredentials: true,
		})
		return next.handle(secureReq)
	}
}
