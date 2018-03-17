import { Component, OnInit } from '@angular/core';
import { Aliment } from '../Class/Aliment';
const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');
const ICON_ARRAY: any = require('./iconList.json');
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  listAliments: Aliment[] = MOCK_ALIMENTS;
  indexSelectedAliment: number=0;
  selectedAliment: Aliment=this.listAliments[0];

  isCreatingNewAliment: Boolean = false;
  iconList: String[] = ICON_ARRAY;
  startCrossAnimation: Boolean = false;

  constructor() { }

  ngOnInit() {

  }

  posElementSelected(event: number) {
    this.indexSelectedAliment = event;
    this.selectedAliment = this.listAliments[event];
  }

  newAlimentForm() {
    console.log("newALim");
    this.isCreatingNewAliment = true;
  }

  toto() {
    console.log('toto');
  }

  abortCreation() {
    this.isCreatingNewAliment = false;
    this.startCrossAnimation = false;
  }
}
