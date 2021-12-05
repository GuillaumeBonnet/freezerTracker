import {
	Component,
	OnInit,
	ElementRef,
	ViewChild,
	AfterViewInit,
} from '@angular/core'
import { DataService } from './Services/data.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
	constructor(
		private dataService: DataService,
		breakpointObserver: BreakpointObserver
	) {
		breakpointObserver
			.observe([Breakpoints.Handset])
			.subscribe((result) => {
				if (result.matches) {
					this.screenType = 'mobile'
				} else {
					this.screenType = 'desktop'
				}
			})

		this.dataService.spinnerEvent.subscribe({
			next: (isSpinnerDisplayed: Boolean) => {
				Promise.resolve(null).then(() => {
					this.isSpinnerDisplayed = isSpinnerDisplayed
				})
			},
		})
	}

	ngOnInit() {}

	ngAfterViewInit() {
		setTimeout(() => {
			this.radiusInPx = this.maincontent.nativeElement.offsetWidth
			this.radiusInPx *= 0.3
		}, 0)
	}

	isInIframe() {
		try {
			return window.self !== window.top
		} catch (e) {
			return true
		}
	}

	@ViewChild('maincontent', null) maincontent: ElementRef

	radiusInPx: number
	title = 'app'
	screenType: string = 'desktop'
	isSpinnerDisplayed: Boolean = false
}
