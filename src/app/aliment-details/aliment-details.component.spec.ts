import {
	async,
	ComponentFixture,
	TestBed,
	tick,
	fakeAsync,
} from '@angular/core/testing'

import { AlimentDetailsComponent } from './aliment-details.component'

/* -------------------------------------------------------------------------- */
/*                             Test Host Component                            */
/* -------------------------------------------------------------------------- */

import { Component, DebugElement } from '@angular/core'
import { Aliment } from '../Class/Aliment'
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRouteStub } from '../../testing/activated-route-stub'
import { DatePipe } from '@angular/common'
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@Component({
	template: ` <app-aliment-details
		[aliment]="aliment"
		[freezerId]="freezerId"
		(posAlimentSelected)="posAlimentSelected(alimentIndex)"
	>
	</app-aliment-details>`,
})
class TestHostComponent {
	aliment: Aliment = new Aliment({
		id: 1,
		name: 'biscuits petit beurre',
		category: 'snacks',
		iconicFontName: 'icon-batch1_biscuit',
		quantity: 12,
		quantityUnit: 'pieces',
		storedDate: new Date('2019-07-08'),
		expirationDate: new Date('2019-07-10'),
	})
	freezerId: number = 2

	alimentIndex: number
	posAlimentSelected(alimentIndex: number) {
		this.alimentIndex = alimentIndex
	}
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('AlimentDetailsComponent', () => {
	let testHost: TestHostComponent
	let fixture: ComponentFixture<TestHostComponent>
	let component: HTMLElement
	let routerSpy
	let stubedRoute: ActivatedRouteStub
	let stubedMatDialog

	beforeEach(async(() => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate'])
		stubedRoute = new ActivatedRouteStub()
		stubedMatDialog = jasmine.createSpyObj('MatDialog', ['open'])
		TestBed.configureTestingModule({
			declarations: [AlimentDetailsComponent, TestHostComponent],
			providers: [
				{ provide: MatDialog, useValue: stubedMatDialog },
				{ provide: Router, useValue: routerSpy },
				{ provide: ActivatedRoute, useValue: stubedRoute },
			],
			imports: [BrowserAnimationsModule],
		}).compileComponents()
		fixture = TestBed.createComponent(TestHostComponent)
		testHost = fixture.componentInstance
		fixture.detectChanges()
		component = fixture.nativeElement.querySelector('app-aliment-details')
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should display the freezer fields', () => {
		let fields: NodeListOf<HTMLElement> =
			component.querySelectorAll('.line')
		let datePipe: DatePipe = new DatePipe('en-US')

		let nameText: string = fields.item(0).innerText
		expect(nameText).toContain('Name')
		expect(nameText).toContain(testHost.aliment.name)

		let categoryText: string = fields.item(1).innerText
		expect(categoryText).toContain('Category')
		expect(categoryText).toContain(testHost.aliment.category)

		let expirationDateText: string = fields.item(2).innerText
		expect(expirationDateText).toContain('Expiration date')
		expect(expirationDateText).toContain(
			datePipe.transform(testHost.aliment.expirationDate, 'longDate')
		)

		let storedDateText: string = fields.item(3).innerText
		expect(storedDateText).toContain('Stored date')
		expect(storedDateText).toContain(
			datePipe.transform(testHost.aliment.storedDate, 'longDate')
		)

		let quantityText: string = fields.item(4).innerText
		expect(quantityText).toContain('Quantity')
		expect(quantityText).toContain(
			`${testHost.aliment.quantity} ${testHost.aliment.quantityUnit}`
		)
	})

	it('should display the right svg', () => {
		let svgIcon: HTMLElement = component.querySelector('.aliment__svg')
		expect(svgIcon.nodeName).toBe('svg')
		let useChildNode: Element = svgIcon.children[0]
		expect(useChildNode).toBeTruthy()
		expect(useChildNode.attributes.getNamedItem('xlink:href').value).toBe(
			'#' + testHost.aliment.iconicFontName
		)
	})

	it('should navigate to edit', async(() => {
		let editButton: HTMLElement = component.querySelector(
			'button#aliment-details-edit'
		)
		editButton.click()
		fixture
			.whenStable()
			.then(() => {
				// wait for async animation setTimeOut
				expect(routerSpy.navigate).toHaveBeenCalledWith(
					['edit-aliment', testHost.aliment.id],
					{ relativeTo: stubedRoute }
				)
			})
			.catch((error) => {
				throw new Error('fixture was never stabled. Error : ' + error)
			})
	}))

	it('should do the deleta action', () => {
		let deleteButton: HTMLElement = component.querySelector(
			'#aliment-details-delete'
		)
		deleteButton.click()
		expect(stubedMatDialog.open).toHaveBeenCalledWith(
			PopUpDeleteComponent,
			{
				width: '200px',
				panelClass: 'gs-popup',
				data: {
					freezerId: testHost.freezerId,
					alimentId: testHost.aliment.id,
				},
			}
		)
	})
})
