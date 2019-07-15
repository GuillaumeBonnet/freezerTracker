import {
  Component, OnInit, Inject, AfterViewInit
  , EventEmitter
  , Input, Output
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Aliment } from '../Class/Aliment';



@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.scss']
})
export class AlimentComponent implements OnInit, AfterViewInit {

  @Input()
  aliment: Aliment;

  @Input()
  i: Number;

  @Input()
  isSelected: Boolean;

  @Output()
  posAlimentSelected = new EventEmitter<Number>();


  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  elementSelected() {
    this.posAlimentSelected.emit(this.i);
  }

}
