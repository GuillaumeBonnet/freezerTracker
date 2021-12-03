import {
	Component,
	OnInit,
	Inject,
	AfterViewInit,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'
import { Aliment } from '../Class/Aliment'

@Component({
	selector: 'app-aliment',
	templateUrl: './aliment.component.html',
	styleUrls: ['./aliment.component.scss'],
})
export class AlimentComponent implements OnInit, AfterViewInit {
	@Input()
	aliment: Aliment

	@Input()
	i: Number

	@Input()
	isSelected: Boolean

	@Output()
	posAlimentSelected = new EventEmitter<Number>()

	constructor() {}

	ngOnInit() {}

	ngAfterViewInit() {}

	elementSelected() {
		this.posAlimentSelected.emit(this.i)
	}
}
