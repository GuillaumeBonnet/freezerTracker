import { Component, OnInit } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { Router } from '@angular/router';

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
  startCrossAnimation: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  posElementSelected(event: number) {
    this.indexSelectedAliment = event;
    this.selectedAliment = this.listAliments[event];
  }
}
