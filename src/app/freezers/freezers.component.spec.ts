import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezersComponent } from './freezers.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { Freezer } from '../Class/Freezer';

@Component({
	template: `
		<app-freezers>
		</app-freezers>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('FreezersComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const dataServiceSpy = jasmine.createSpyObj('DataService', ['getFreezers', 'addFreezer']);
		dataServiceSpy.getFreezers.and.returnValue(of([ new Freezer({name: "name"})]));
		TestBed.configureTestingModule({
			declarations: [
				FreezersComponent
				, TestHostComponent
			],
			providers:    [
				{provide: MatDialog}
				, { provide: Router, useValue: routerSpy}
				, { provide: DataService, useValue: dataServiceSpy}
			],
			imports: [
				MatCardModule
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-freezers')
		expect(component).toBeTruthy();
	});
});
