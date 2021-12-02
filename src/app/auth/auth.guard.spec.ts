import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

describe('AuthGuard', () => {
	const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
	const dataServiceSpy = jasmine.createSpyObj('DataService', ['getUserInfo']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
			AuthGuard
			, {provide: Router, useValue: routerSpy}
			, {provide: DataService, userValue: dataServiceSpy}
		]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
