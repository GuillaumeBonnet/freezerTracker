import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataService } from './Services/data.service';
import { of } from 'rxjs';
@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }
@Component({selector: 'app-menu', template: ''})
class AppMenuStubComponent { }

describe('AppComponent', () => {
	let dataServiceSpy = jasmine.createSpyObj('DataService', ['spinnerEvent']);
	dataServiceSpy.spinnerEvent = of(true);
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				RouterOutletStubComponent,
				AppMenuStubComponent,
			],
			providers: [
				{provide: DataService, useValue: dataServiceSpy}
			],
			imports: [
				MatProgressSpinnerModule,
			]
		}).compileComponents();
	}));
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	it(`should have as title 'app'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('app');
	}));
});
