import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { FreezerContent } from './freezerContent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../Services/data.service';
import { AlimentDetailsComponent } from '../aliment-details/aliment-details.component';
import { AlimentComponent } from '../aliment/aliment.component';


@Component({
	template: `
		<app-freezerContent>
		</app-freezerContent>`
})
class TestHostComponent {
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('FreezerContent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const dataServiceSpy = jasmine.createSpyObj('DataService', ['getFreezerContent']);
		const stubedRoute = new ActivatedRouteStub();
		TestBed.configureTestingModule({
			declarations: [
				FreezerContent
				, TestHostComponent
				, AlimentDetailsComponent
				, AlimentComponent
			],
			providers:    [
				{ provide: Router, useValue: routerSpy}
				, { provide: DataService, useValue: dataServiceSpy}
				, {provide: ActivatedRoute, useValue: stubedRoute}
			],
			imports: [
			]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-freezerContent')
		expect(component).toBeTruthy();
	});
});

