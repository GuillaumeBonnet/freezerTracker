import { TestBed } from '@angular/core/testing';

import { InterceptorXsrfHeaderWritterService } from './interceptor-xsrf-header-writter.service';

describe('InterceptorXsrfHeaderWritterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterceptorXsrfHeaderWritterService = TestBed.get(InterceptorXsrfHeaderWritterService);
    expect(service).toBeTruthy();
  });
});
