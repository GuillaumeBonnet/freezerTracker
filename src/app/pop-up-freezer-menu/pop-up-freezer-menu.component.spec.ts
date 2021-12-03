import { TestBed, ComponentFixture, async } from '@angular/core/testing'
import { NgModule, Component, DebugElement } from '@angular/core'
import {
	MatDialogModule,
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
} from '@angular/material/dialog'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { OverlayContainer } from '@angular/cdk/overlay'
import { Freezer } from '../Class/Freezer'
import { PopUpFreezerMenuComponent } from './pop-up-freezer-menu.component'
import { DataService } from '../Services/data.service'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import { Aliment } from '../Class/Aliment'

@Component({
	template: ` <app-pop-up-freezer-menu> </app-pop-up-freezer-menu>`,
})
class TestHostComponent {}

@NgModule({
	imports: [MatDialogModule, NoopAnimationsModule],
	exports: [PopUpFreezerMenuComponent],
	declarations: [PopUpFreezerMenuComponent],
	entryComponents: [PopUpFreezerMenuComponent],
})
class DialogTestModuleForPopBehaviour {}

describe('PopUpFreezerMenuComponent', () => {
	describe('with testHostComponent', () => {
		let testHost: TestHostComponent
		let fixture: ComponentFixture<TestHostComponent>
		let component: DebugElement
		let dataServiceSpy = jasmine.createSpyObj('DataService', [
			'deleteAliment',
			'deleteFreezer',
		])
		dataServiceSpy.deleteAliment.and.returnValue(of())
		dataServiceSpy.deleteFreezer.and.returnValue(of())
		let freezerMenuMatDialogSpy = jasmine.createSpyObj('MatDialogRef', [
			'close',
		])
		let dialogMockMenu = jasmine.createSpyObj(
			'MatDialogRef<PopUpFreezerMenuComponent>',
			['close']
		)
		let matDialogData = {
			selectedFreezer: new Freezer({ name: 'freezerName' }),
		}
		let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [PopUpFreezerMenuComponent, TestHostComponent],
				providers: [
					{ provide: MatDialogRef, userValue: dialogMockMenu },
					{ provide: DataService, useValue: dataServiceSpy },
					{ provide: MAT_DIALOG_DATA, useValue: matDialogData },
					{ provide: MatDialog, useValue: matDialogSpy },
				],
				imports: [],
			}).compileComponents()
			fixture = TestBed.createComponent(TestHostComponent)
			testHost = fixture.componentInstance
			fixture.detectChanges()
			component = fixture.debugElement.query(
				By.css('app-pop-up-freezer-menu')
			)
		}))

		it('should create comp', () => {
			expect(component).toBeTruthy()
		})
		it('should display the name', () => {
			expect(
				component.query(By.css('h2')).nativeElement.textContent
			).toContain(matDialogData.selectedFreezer.name)
		})
	})
})
