import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezerContent } from './freezerContent.component';

describe('FreezerContent', () => {
	let component: FreezerContent;
	let fixture: ComponentFixture<FreezerContent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FreezerContent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FreezerContent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
