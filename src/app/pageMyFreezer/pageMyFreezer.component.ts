import { Component, OnInit } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');
@Component({
  selector: 'app-pageMyFreezer',
  templateUrl: './pageMyFreezer.component.html',
  styleUrls: ['./pageMyFreezer.component.scss']
})
export class PageMyFreezerComponent {

  listAliments: Aliment[] = this.dataService.getAliments();
  indexSelectedAliment: number=0;
  selectedAliment: Aliment=this.listAliments[0];
  startCrossAnimation: Boolean = false;

  constructor(private router: Router, private dataService: DataService) { }


  posElementSelected(event: number) {
    this.indexSelectedAliment = event;
    this.selectedAliment = this.listAliments[event];
  }
}
