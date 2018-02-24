import {
  Directive,  ElementRef, 
  AfterViewInit, OnInit, OnChanges
  , Input
} from '@angular/core';
import {MainServiceService} from './main-service.service';
@Directive({
  selector: '[appSquarify]'
})
export class SquarifyDirective implements OnInit, AfterViewInit, OnChanges {
  
  @Input()
  appSquarify: String;

  constructor(public el: ElementRef, private utils: MainServiceService) {   
  }

  ngOnInit() {
    this.squarifyWithMargin();
  }
  
  //TODO event cordova onLandScape
  ngOnChanges() {
    this.squarifyWithMargin();
  }

  squarifyWithMargin() {
    let style = this.el.nativeElement.style;
  
    let parentCompStyle:CSSStyleDeclaration = getComputedStyle(<HTMLElement>this.el.nativeElement.parentElement.parentElement.parentElement); 
    let funcPxToNumber = this.utils.pixelToNumber;
    style.height = (funcPxToNumber(parentCompStyle.height) - 2 * funcPxToNumber(parentCompStyle.borderWidth)) + 'px';
    style.width = style.height;
  
    if( funcPxToNumber(this.appSquarify) != NaN) {
      style.margin = this.appSquarify;
      //arithmetic with the px strings
      style.height = (funcPxToNumber(style.height) - 2 * funcPxToNumber(this.appSquarify)) + 'px';
      style.width = style.height;
    }    
  }

  ngAfterViewInit() {
  }

}
