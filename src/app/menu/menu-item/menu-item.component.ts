import { Component, OnInit, Input, Output } from '@angular/core'
import { trigger, style, animate, transition, state } from '@angular/animations'
import { EventEmitter } from '@angular/core'

@Component({
	selector: 'app-menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls: ['./menu-item.component.scss'],
	animations: [
		trigger('flyInOut', [
			state('in', style({ transform: '{{translation}}', opacity: 1 }), {
				params: { translation: 'translateX(0) translateY(0)' },
			}),
			transition('void => *', [
				style({ transform: 'translateX(0) translateY(0)', opacity: 0 }),
				animate(100),
			]),
			transition('* => void', [
				animate(
					100,
					style({
						transform: 'translateX(0) translateY(0)',
						opacity: 0,
					})
				),
			]),
		]),
	],
})
export class MenuItemComponent implements OnInit {
	@Input()
	angle: number
	@Input()
	label: string
	translationString: string
	@Input()
	radiusInPx: number = 30

	@Input()
	isOpened: Boolean = false

	ngOnInit() {
		this.translationString = `translateX(${(
			-this.radiusInPx * Math.cos((this.angle * Math.PI) / 180)
		).toFixed(3)}px) translateY(${(
			-this.radiusInPx * Math.sin((this.angle * Math.PI) / 180)
		).toFixed(3)}px)`
	}
}
