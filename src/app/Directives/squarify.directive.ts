import {
  Directive,  ElementRef,
  AfterViewInit, OnInit, OnChanges
  , Input, AfterViewChecked, HostListener
} from '@angular/core';

import {MainServiceService} from '../Services/main-service.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appSquarify]'
})
export class SquarifyDirective implements AfterViewChecked {

  subscription: Subscription;

  @Input()
  appSquarify: String;

  constructor(public el: ElementRef, private utils: MainServiceService) {
  }

  @HostListener('window:resize')
  resized() {
    //I think that since this function is call, ngOnChanges is triggered
  }


  ngAfterViewChecked() {
    this.squarifyWithMargin();
    // this.subscription = Observable.fromEvent(window, 'resize')
    // // .throttleTime(200)
    // .debounceTime(200)
    // .subscribe(() => {
    //   console.log("resize2");
    //   this.squarifyWithMargin();
    // });
  }

  squarifyWithMargin() {
    let style = this.el.nativeElement.style;

    let parentCompStyle:CSSStyleDeclaration = getComputedStyle(<HTMLElement>this.el.nativeElement.parentElement.parentElement.parentElement);
    let funcPxToNumber = this.utils.pixelToNumber;
    // style.height = (funcPxToNumber(parentCompStyle.height) - 2 * funcPxToNumber(parentCompStyle.borderWidth)) + 'px';
    style.height = parentCompStyle.height;

    style.width = style.height;

    if( funcPxToNumber(this.appSquarify) != NaN) {
      style.margin = this.appSquarify;
      //arithmetic with the px strings
      style.height = (funcPxToNumber(style.height) - 2 * funcPxToNumber(this.appSquarify)) + 'px';
      style.width = style.height;
    }
  }

}
