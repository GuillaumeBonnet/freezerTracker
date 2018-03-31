import { Component, OnInit,
  Input
} from '@angular/core';

import { Aliment } from '../Class/Aliment';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aliment-details',
  templateUrl: './aliment-details.component.html',
  styleUrls: ['./aliment-details.component.scss']
})
export class AlimentDetailsComponent implements OnInit {

  //either input is aliment and this component is used as a detail showcase
  // else the input is only a form group and it's used when editing or createing a new aliment
  @Input()
  aliment: Aliment = new Aliment();

  constructor() {

   }

  ngOnInit() {
  }

}
