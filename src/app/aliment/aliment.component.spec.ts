import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentComponent } from './aliment.component';

/* -------------------------------------------------------------------------- */
/*                             Test Host Component                            */
/* -------------------------------------------------------------------------- */

import { Component } from '@angular/core';
import { Aliment } from '../Class/Aliment';

@Component({
	template: `
		<app-aliment
			[aliment]="aliment" [i]="i" (posAlimentSelected)="handledAlimentSelected($event)">
		</app-aliment>`
})
class TestHostComponent {
	aliment: Aliment = new Aliment({id:1, name:'biscuits petit beurre', category:'snacks', iconicFontName:'icon-batch1_biscuit', quantity:12, quantityUnit:'pieces', storedDate:new Date('2019-07-08'), expirationDate:new Date('2019-07-10') });
	i: number = 3;
	testHost_alimentSelected: Aliment;
	handledAlimentSelected(alimentSelected: Aliment) {
		this.testHost_alimentSelected = alimentSelected;
	}
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('AlimentComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AlimentComponent, TestHostComponent]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		let component = fixture.nativeElement.querySelector('app-aliment')
		expect(component).toBeTruthy();
	});
});



