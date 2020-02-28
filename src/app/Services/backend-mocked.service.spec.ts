import { TestBed, inject } from '@angular/core/testing';

import { BackendServiceMocked } from './backend-mocked.service';

describe('BackendService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [BackendServiceMocked]
		});
	});

	it('should be created', inject([BackendServiceMocked], (service: BackendServiceMocked) => {
		expect(service).toBeTruthy();
	}));
});
