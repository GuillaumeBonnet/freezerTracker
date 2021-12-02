import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NgModule, Component, DebugElement } from '@angular/core';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Freezer } from '../Class/Freezer';
import { PopUpDeleteComponent } from './pop-up-delete.component';
import { DataService } from '../Services/data.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Aliment } from '../Class/Aliment';
import { PopUpFreezerMenuComponent } from '../pop-up-freezer-menu/pop-up-freezer-menu.component';

@Component({
	template: `
		<app-pop-up-delete>
		</app-pop-up-delete>`
})
class TestHostComponent {
}

@NgModule({
	imports: [MatDialogModule, NoopAnimationsModule],
	exports: [PopUpDeleteComponent],
	declarations: [PopUpDeleteComponent],
	entryComponents: [PopUpDeleteComponent],
})
class DialogTestModuleForPopBehaviour { }

describe('PopUpDeleteComponent', () => {
	describe('with testHostComponent', () => {
		let testHost: TestHostComponent;
		let fixture: ComponentFixture<TestHostComponent>;
		let component: DebugElement;
		let dataServiceSpy = jasmine.createSpyObj('DataService', ['deleteAliment', 'deleteFreezer']);
			dataServiceSpy.deleteAliment.and.returnValue(of());
			dataServiceSpy.deleteFreezer.and.returnValue(of());
		let freezerMenuMatDialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
		// const dialogMock:MatDialogRef<PopUpFreezerMenuComponent> = {
		// 	close: () => { },
		// 	_afterClosed: () => {},
		// 	};
		let dialogMockMenu = jasmine.createSpyObj('MatDialogRef<PopUpFreezerMenuComponent>', ['close']);
		let matDialogData = {freezerId: 2, alimentId: 3};
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [
					PopUpDeleteComponent
					, TestHostComponent
				],
				providers:    [
					{ provide: MatDialogRef, userValue: dialogMockMenu}
					, { provide: DataService, useValue: dataServiceSpy}
					, { provide: MAT_DIALOG_DATA, useValue: matDialogData}
				],
				imports: [
				]
			})
			.compileComponents();
			fixture = TestBed.createComponent(TestHostComponent);
			testHost = fixture.componentInstance;
			fixture.detectChanges();
			component = fixture.debugElement.query(By.css('app-pop-up-delete'));
		}));

		it('should create comp', () => {
			expect(component).toBeTruthy();
		});
		it('should display the right qestion', () => {
			expect(component.query(By.css('div.gs-text')).nativeElement.textContent)
				.toContain('Are you sure you want to delete this aliment ?')
			;
			component.componentInstance.data.alimentId = null;
			fixture.detectChanges();
			expect(component.query(By.css('div.gs-text')).nativeElement.textContent)
				.toContain('Are you sure you want to delete this freezer ?')
			;
		});
		it('should close pop-up when cancel button is clicked', () => {
			let cancelButton:HTMLElement = component.query(By.css('button#close-button')).nativeElement;
			cancelButton.click();
			// expect(dialogMockMenu.close).toHaveBeenCalled();
		});
		it('should close pop-up when cross is clicked', () => {
			let crossButton:HTMLElement = component.query(By.css('button#cross-button')).nativeElement;
			crossButton.click();
			// expect(freezerMenuMatDialogSpy.close).toHaveBeenCalled();
		});
		it('should delete the right object', () => {
			let deleteButton:HTMLElement = component.query(By.css('button#delete-button')).nativeElement;
			deleteButton.click();
			expect(dataServiceSpy.deleteAliment).toHaveBeenCalledWith(matDialogData.freezerId, new Aliment({id: matDialogData.alimentId}));
			// expect(dialogMockMenu.close).toHaveBeenCalled();

			component.componentInstance.data.alimentId = null;
			fixture.detectChanges();
			deleteButton.click();
			expect(dataServiceSpy.deleteFreezer).toHaveBeenCalledWith(matDialogData.freezerId);
			// expect(dialogMockMenu.close).toHaveBeenCalled();
		});
	});
	describe('with DialogTestModule', () => {
		let dialog: MatDialog;
		let overlayContainerElement: HTMLElement;
		let dataServiceSpy = jasmine.createSpyObj('DataService', ['deleteAliment',	'deleteFreezer']);

		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [ DialogTestModuleForPopBehaviour ],
				providers: [
					{
						provide: OverlayContainer,
						useFactory: () => {
							overlayContainerElement = document.createElement('div');
							return { getContainerElement: () => overlayContainerElement };
						},
					},
					{provide: DataService, useValue: dataServiceSpy},
				]
			});

			dialog = TestBed.get(MatDialog);
		});

		it('should open and create the popup', () => {
			dialog.open(
				PopUpDeleteComponent
				, {
					width: '250px',
					panelClass: 'gs-popup',
					data: {
						freezerId: 1,
						alimentId: 2,
					}
				}
			);
			let component = overlayContainerElement.querySelector('app-pop-up-delete')
			expect(component).toBeTruthy();
		});

		it('should display the question for aliment', () => {
			dialog.open(
				PopUpDeleteComponent
				, {
					width: '250px',
					panelClass: 'gs-popup',
					data: {
						freezerId: 1,
						alimentId: 2,
					}
				}
			);
			let component = overlayContainerElement.querySelector('app-pop-up-delete')
			// expect(component.textContent).toContain('Are you sure you want to delete this aliment ?');
		});
	});
});
