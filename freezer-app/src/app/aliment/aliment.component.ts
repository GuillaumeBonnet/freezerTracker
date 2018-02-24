import { 
  Component, OnInit, Inject, AfterViewInit 
  , Input
} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import { Aliment } from '../Class/Aliment';



@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.scss']
})
export class AlimentComponent implements OnInit, AfterViewInit {

  @Input()
  aliment: Aliment;

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    console.log("aliment", this.aliment.name);
  }

  ngAfterViewInit() {
  }

}
