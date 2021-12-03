import { Component, OnInit } from '@angular/core'
import { Aliment } from '../Class/Aliment'
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router'
import { DataService } from '../Services/data.service'
import { Freezer } from '../Class/Freezer'
import { switchMap } from 'rxjs/operators'

@Component({
	selector: 'app-freezerContent',
	templateUrl: './freezerContent.component.html',
	styleUrls: ['./freezerContent.component.scss'],
})
export class FreezerContent implements OnInit {
	listAliments: Aliment[]
	indexSelectedAliment: number = 0
	selectedAliment: Aliment

	freezerId: number
	startCrossAnimation: Boolean = false

	constructor(
		public router: Router,
		private dataService: DataService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params
			.pipe(
				switchMap((params: Params) => {
					this.freezerId = +params.freezerId
					return this.dataService.getFreezerContent(this.freezerId)
				})
			)
			.subscribe({
				next: (freezerContent: Aliment[]) => {
					this.listAliments = freezerContent
					this.selectedAliment =
						this.listAliments && this.listAliments.length >= 1
							? this.listAliments[0]
							: null
				},
				error: (error) => {
					console.log(
						'error when getting freezerId from url or when getting freezers from data service:',
						error
					)
					this.router.navigate(['freezers'])
				},
			})
	}

	posElementSelected(event: number) {
		this.indexSelectedAliment = event
		this.selectedAliment = this.listAliments[event]
	}

	public get isFreezerEmpty(): Boolean {
		return !this.listAliments || this.listAliments.length == 0
	}

	newAliment() {
		const animationDuration: number = 0.2 * 1000
		this.startCrossAnimation = true
		setTimeout(() => {
			this.router.navigate(['new-aliment'], { relativeTo: this.route })
		}, animationDuration)
	}
}
