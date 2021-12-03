import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AlimentComponent } from './aliment.component'

/* -------------------------------------------------------------------------- */
/*                             Test Host Component                            */
/* -------------------------------------------------------------------------- */

import { Component } from '@angular/core'
import { Aliment } from '../Class/Aliment'
import { ignoreElements } from 'rxjs/operators'

@Component({
	template: ` <app-aliment
		[aliment]="aliment"
		[i]="i"
		[isSelected]="isSelected"
		(posAlimentSelected)="handledAlimentSelected($event)"
	>
	</app-aliment>`,
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
	i: number = 3
	isSelected: boolean = false
	alimentIndex: Number
	handledAlimentSelected(alimentIndex: Number) {
		this.alimentIndex = alimentIndex
	}
}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('AlimentComponent', () => {
	let testHost: TestHostComponent
	let fixture: ComponentFixture<TestHostComponent>
	let component: HTMLElement

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AlimentComponent, TestHostComponent],
		}).compileComponents()
		fixture = TestBed.createComponent(TestHostComponent)
		testHost = fixture.componentInstance
		component = fixture.nativeElement.querySelector('app-aliment')
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('h1 should contain name', () => {
		let h1Text: string = component.querySelector('h1').textContent
		expect(h1Text).toContain(testHost.aliment.name)
	})

	it('should display the right svg', () => {
		let svgIcon: HTMLElement = component.querySelector('.aliment-card__svg')
		expect(svgIcon.nodeName).toBe('svg')
		let useChildNode: Element = svgIcon.children[0]
		expect(useChildNode).toBeTruthy()
		expect(useChildNode.attributes.getNamedItem('xlink:href').value).toBe(
			'#' + testHost.aliment.iconicFontName
		)
	})

	it('should change when is selected', () => {
		let h1 = component.querySelector('h1')
		expect(h1.className).toBe('aliment-card__title')
		let mainDiv = component.querySelector('div')
		expect(mainDiv.className).toBe('aliment-card')

		testHost.isSelected = true
		fixture.detectChanges()

		expect(h1.className).toBe(
			'aliment-card__title aliment-card__title--selected'
		)
		expect(mainDiv.className).toBe('aliment-card aliment-card--selected')
	})

	it('should trigger the event when selected', () => {
		expect(testHost.alimentIndex).toBeFalsy()
		let mainDiv = component.querySelector('div')

		mainDiv.click()
		expect(testHost.alimentIndex).toBe(testHost.i)
	})
})
