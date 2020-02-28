import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentDetailsComponent } from './aliment-details.component';


/* -------------------------------------------------------------------------- */
/*                             Test Host Component                            */
/* -------------------------------------------------------------------------- */

import { Component } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';

@Component({
	template: `
		<app-aliment-details
			[aliment]="aliment" [freezerId]="freezerId">
		</app-aliment-details>`
})
class TestHostComponent {
  aliment: Aliment = new Aliment({id:1, name:'biscuits petit beurre', category:'snacks', iconicFontName:'icon-batch1_biscuit', quantity:12, quantityUnit:'pieces', storedDate:new Date('2019-07-08'), expirationDate:new Date('2019-07-10') });
  freezerId: number = 2;
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('AlimentDetailsComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const stubedRoute = new ActivatedRouteStub();
		TestBed.configureTestingModule({
			declarations: [AlimentDetailsComponent, TestHostComponent],
			providers:    [
				{provide: MatDialog}
				, { provide: Router, useValue: routerSpy}
				, {provide: ActivatedRoute, userValue: stubedRoute}
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-aliment-details')
		expect(component).toBeTruthy();
	});
});

