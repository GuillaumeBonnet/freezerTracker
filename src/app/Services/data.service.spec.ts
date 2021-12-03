import { TestBed, inject } from '@angular/core/testing'

import { DataService } from './data.service'
import { environment } from '../../environments/environment'

describe('DataService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DataService,
				{
					provide: 'BackendService',
					useClass: environment.BackendService,
				},
			],
		})
	})

	it('should be created', inject([DataService], (service: DataService) => {
		expect(service).toBeTruthy()
	}))
})
