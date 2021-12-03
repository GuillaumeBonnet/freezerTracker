import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MenuComponent } from './menu.component'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { CookieService } from 'ngx-cookie-service'
import { MenuItemComponent } from './menu-item/menu-item.component'
import { Location } from '@angular/common'
import { componentFactoryName } from '@angular/compiler'
import { SSL_OP_NO_QUERY_MTU } from 'constants'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DataService } from '../Services/data.service'

@Component({
	template: ` <app-menu> </app-menu>`,
})
class TestHostComponent {}

/* -------------------------------------------------------------------------- */
/*                                 Assertions                                 */
/* -------------------------------------------------------------------------- */

describe('MenuComponent', () => {
	let testHost: TestHostComponent
	let fixture: ComponentFixture<TestHostComponent>
	let component: HTMLElement
	let routerSpy
	let locationSpy
	let dataServiceSpy
	let authGuardSpy
	let cookieServiceSpy
	let customSetup = (context: string) => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate'])
		locationSpy = jasmine.createSpyObj('Location', ['back', 'forward'])
		dataServiceSpy = jasmine.createSpyObj('DataService', ['logout'])
		authGuardSpy = jasmine.createSpyObj('AuthGuard', [
			'getIsLoggedIn',
			'setIsLoggedIn',
		])
		if (context == 'not-logged') {
			authGuardSpy.getIsLoggedIn.and.returnValue(false)
		} else {
			authGuardSpy.getIsLoggedIn.and.returnValue(true)
		}
		cookieServiceSpy = jasmine.createSpyObj('CookieService', ['deleteAll'])
		TestBed.configureTestingModule({
			declarations: [MenuComponent, TestHostComponent, MenuItemComponent],
			providers: [
				{ provide: Router, useValue: routerSpy },
				{ provide: DataService, useValue: dataServiceSpy },
				{ provide: AuthGuard, useValue: authGuardSpy },
				{ provide: CookieService, useValue: cookieServiceSpy },
				{ provide: Location, useValue: locationSpy },
			],
			imports: [BrowserAnimationsModule],
		}).compileComponents()
		fixture = TestBed.createComponent(TestHostComponent)
		testHost = fixture.componentInstance
		fixture.detectChanges()
		component = fixture.nativeElement.querySelector('app-menu')
	}

	it('should create', () => {
		customSetup('default')
		expect(component).toBeTruthy()
	})
	it('should navigate to previous page', () => {
		customSetup('default')
		let backAction: HTMLElement = component.querySelector('#back-action')
		backAction.click()
		expect(locationSpy.back).toHaveBeenCalled()
	})
	it('should navigate to next page', () => {
		customSetup('default')
		let forwardAction: HTMLElement =
			component.querySelector('#forward-action')
		forwardAction.click()
		expect(locationSpy.forward).toHaveBeenCalled()
	})
	it('should open logged in menu', () => {
		customSetup('default')
		let opener: HTMLElement = component.querySelector('.opener')
		let menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(0)

		opener.click()
		fixture.detectChanges()
		menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(3)

		opener.click()
		fixture.detectChanges()
		menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(0)
	})
	it('should open another menu when not logged', () => {
		customSetup('not-logged')
		let opener: HTMLElement = component.querySelector('div.opener')
		let menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(0)

		opener.click()
		fixture.detectChanges()
		menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(2)
		;(<HTMLElement>component.querySelector('.gs-shadow-backdrop')).click()
		fixture.detectChanges()
		menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(0)
	})
	it('should navigate to pages through the different menu item', () => {
		customSetup('default')
		let opener: HTMLElement = component.querySelector('.opener')
		let menuItems = component.querySelectorAll(
			'app-menu-item[ng-reflect-is-opened="true"]'
		)
		expect(menuItems.length).toBe(0)

		for (let i = 0; i < 2; i++) {
			opener.click()
			fixture.detectChanges()
			menuItems = component.querySelectorAll(
				'app-menu-item[ng-reflect-is-opened="true"]'
			)
			expect(menuItems.length).toBe(3)
			;(<HTMLElement>menuItems[i]).click()
			if (i == 2) {
				expect(dataServiceSpy.logout).toHaveBeenCalled()
			} else {
				expect(routerSpy.navigate).toHaveBeenCalled()
			}
			fixture.detectChanges()
			menuItems = component.querySelectorAll(
				'app-menu-item[ng-reflect-is-opened="true"]'
			)
			expect(menuItems.length).toBe(0)
		}
	})
})
