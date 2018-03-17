import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aliment-form',
  templateUrl: './aliment-form.component.html',
  styleUrls: ['./aliment-form.component.scss']
})
export class AlimentFormComponent implements OnInit {

  @Output()
  abortCreation = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
