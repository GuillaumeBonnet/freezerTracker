import { Component, OnInit,
  Input
} from '@angular/core';

import { Aliment } from '../Class/Aliment';

@Component({
  selector: 'app-aliment-details',
  templateUrl: './aliment-details.component.html',
  styleUrls: ['./aliment-details.component.scss']
})
export class AlimentDetailsComponent implements OnInit {

  @Input()
  aliment: Aliment;

  constructor() { }

  ngOnInit() {
  }

}
