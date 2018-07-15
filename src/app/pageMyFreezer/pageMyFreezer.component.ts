import { Component, OnInit } from '@angular/core';
import { Aliment } from '../Class/Aliment';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { BackendService } from '../Services/backend.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const MOCK_ALIMENTS: any = require('../Mocks/Aliments.json');
@Component({
  selector: 'app-pageMyFreezer',
  templateUrl: './pageMyFreezer.component.html',
  styleUrls: ['./pageMyFreezer.component.scss']
})
export class PageMyFreezerComponent implements OnInit {

  listAliments: Aliment[];
  indexSelectedAliment: number=0;
  selectedAliment: Aliment;
  startCrossAnimation: Boolean = false;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAlimentSubject().subscribe(
      data => {
        this.listAliments = data;
        this.selectedAliment = this.listAliments && this.listAliments.length >= 1 ? this.listAliments[0] : null;
      },
      error => {
        console.log("error", error);
      }
    );
    this.dataService.loadAliments();  
  }

  posElementSelected(event: number) {
    this.indexSelectedAliment = event;
    this.selectedAliment = this.listAliments[event];
  }
}
