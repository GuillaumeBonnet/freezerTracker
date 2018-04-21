import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('shadowing', [
      state('in', style({opacity: 0})),
      transition('void => *', [
        style({opacity: 0}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({opacity: 0}))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  isOpened: Boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(clickEvt: Event, route: string) : void {
    this.router.navigate([route]);
    clickEvt.stopPropagation();
    this.isOpened = false
  }

}
