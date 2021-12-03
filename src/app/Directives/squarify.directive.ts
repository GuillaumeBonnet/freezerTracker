import {
	Directive,
	ElementRef,
	AfterViewInit,
	OnInit,
	OnChanges,
	Input,
	AfterViewChecked,
	HostListener,
} from '@angular/core'

import { MainServiceService } from '../Services/main-service.service'

import { Observable, Subscription } from 'rxjs'
import { debounceTime, throttleTime } from 'rxjs/operators'

@Directive({
	selector: '[appSquarify]',
})
export class SquarifyDirective implements AfterViewChecked {
	subscription: Subscription

	@Input()
	squarifyDimensionOfReference: String

	constructor(public el: ElementRef, private utils: MainServiceService) {}

	@HostListener('window:resize')
	resized() {
		//I think that since this function is call, ngOnChanges is triggered
	}

	ngAfterViewChecked() {
		this.squarifyWithMargin()
		// this.subscription = Observable.fromEvent(window, 'resize')
		// // .throttleTime(200)
		// .debounceTime(200)
		// .subscribe(() => {
		//   console.log("resize2");
		//   this.squarifyWithMargin();
		// });
	}

	squarifyWithMargin() {
		let style = this.el.nativeElement.style

		if (this.squarifyDimensionOfReference == 'height') {
			style.width = this.el.nativeElement.offsetHeight + 'px'
			style.height = style.width
		} else {
			style.height = this.el.nativeElement.offsetWidth + 'px'
			style.width = style.height
		}
	}
}
