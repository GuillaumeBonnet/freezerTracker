import { Component, OnInit } from '@angular/core';
import { Aliment } from '../Class/Aliment';
const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  listAliments: Aliment[] = MOCK_ALIMENTS;
  indexSelectedAliment: number=0;
  selectedAliment: Aliment=this.listAliments[0];
  constructor() { }

  ngOnInit() {
    console.log("listAliment", this.listAliments);
  }

  posElementSelected(event: number) {
    this.indexSelectedAliment = event;
    this.selectedAliment = this.listAliments[event];
  }
}
