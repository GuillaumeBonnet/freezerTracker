import { TestBed } from '@angular/core/testing';

import { InterceptorXsrfHeaderWritterService } from './interceptor-xsrf-header-writter.service';
import { CookieService } from 'ngx-cookie-service';


describe('InterceptorXsrfHeaderWritterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	providers: [
		InterceptorXsrfHeaderWritterService,
		CookieService
	]
  }));

  it('should be created', () => {
    const service: InterceptorXsrfHeaderWritterService = TestBed.get(InterceptorXsrfHeaderWritterService);
    expect(service).toBeTruthy();
  });
});
