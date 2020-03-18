import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, TestBedStatic, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { FreezerContent } from './freezerContent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../Services/data.service';
import { AlimentDetailsComponent } from '../aliment-details/aliment-details.component';
import { AlimentComponent } from '../aliment/aliment.component';
import { Aliment } from '../Class/Aliment';
import { of, throwError } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';


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
	let component: HTMLElement;
	let routerSpy;
	let dataServiceSpy;
	let stubedRoute;
	let testBedStatic:TestBedStatic;

	let freezerIdUrlParam: number = 2;
	let fakeFreezerContent: Aliment[] = [
		new Aliment({id:2, name: 'name2', category: 'category2', quantity: 2, quantityUnit: 'kg', iconicFontName: 'icone2', expirationDate: new Date('2020-07-08'), storedDate: new Date('2019-07-08')}),
		new Aliment({id:3, name: 'name3', category: 'category3', quantity: 3, quantityUnit: 'kg', iconicFontName: 'icone3', expirationDate: new Date('2020-08-08'), storedDate: new Date('2019-08-08')}),
	];

	let setTestHost = (testCase: string) => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		dataServiceSpy = jasmine.createSpyObj('DataService', ['getFreezerContent']);
		if(testCase == 'loading error') {
			dataServiceSpy.getFreezerContent.and.returnValue(throwError(new Error('fakeError')));
		} else if (testCase == 'empty content') {
			dataServiceSpy.getFreezerContent.and.returnValue(of([]));
		} else {
			dataServiceSpy.getFreezerContent.and.returnValue(of(fakeFreezerContent));
		}
		stubedRoute = {params: of({freezerId: freezerIdUrlParam})};
		testBedStatic = TestBed.configureTestingModule({
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
				MatDialogModule
			]
		});
		testBedStatic.compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		component = fixture.nativeElement.querySelector('app-freezerContent');
		fixture.detectChanges();
	};

	it('should creates', () => {
		setTestHost('default');
		expect(component).toBeTruthy();
	});

	it('should requests and display Aliments', async() => {
		setTestHost('default');
		expect(dataServiceSpy.getFreezerContent).toHaveBeenCalledWith(freezerIdUrlParam);
		fixture.detectChanges();
		let alimentCards:NodeListOf<HTMLElement> = component.querySelectorAll('app-aliment');
		expect(alimentCards.length).toBe(2);
		expect(alimentCards.item(0).attributes);

	});

	it('should navigate back to freezer list when request fails', async() => {
		setTestHost('loading error');
		expect(routerSpy.navigate).toHaveBeenCalledWith(['freezers']);
	});

	it('should requests and displays that there is 0 aliments', () => {
		setTestHost('empty content');
		let emptyFiller = component.querySelector('.empty-filler');
		expect(emptyFiller).toBeTruthy();
		expect(emptyFiller.textContent).toContain('empty');
		expect(component.querySelectorAll('app-aliment').length).toBe(0);
	});

	it('should click a selected aliment, change its appearance and feed the aliment detail component ', () => {
		setTestHost('default');
		//state before clicking unselected aliment:
		expect(component.querySelector('app-aliment-details').textContent).toContain('Name :  name2');
		expect(component.querySelector('app-aliment-details').textContent).not.toContain('Name :  name3');
		//state after clicking unselected aliment:
		(<HTMLElement>component.querySelectorAll('app-aliment')[1].children[0]).click();
		fixture.detectChanges();
		expect(component.querySelector('app-aliment-details').textContent).toContain('Name :  name3');
		expect(component.querySelector('app-aliment-details').textContent).not.toContain('Name :  name2');
	});

	it('should navigate to the new aliment page', async(() => {
		setTestHost('default');
		(<HTMLElement>component.querySelector('button.cross')).click();
		fixture.whenStable()
		.then(() => {
			expect(routerSpy.navigate).toHaveBeenCalledWith(['new-aliment'], {relativeTo: stubedRoute});
		})
		.catch((error) => {
			throw new Error('fixture was never stabled. Error : ' + error);
		});
	}));
});

