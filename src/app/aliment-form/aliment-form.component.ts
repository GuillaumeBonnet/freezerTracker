import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
const ICON_ARRAY: any = require('../iconList.json');

@Component({
  selector: 'app-aliment-form',
  templateUrl: './aliment-form.component.html',
  styleUrls: ['./aliment-form.component.scss']
})
export class AlimentFormComponent implements OnInit {

  @Output()
  abortCreation = new EventEmitter();


  iconList: String[] = ICON_ARRAY;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
