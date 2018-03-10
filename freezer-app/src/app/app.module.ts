import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AlimentComponent } from './aliment/aliment.component';
import { Page1Component } from './page1/page1.component';
import { SquarifyDirective } from './squarify.directive';
import {MainServiceService} from './main-service.service';
import { AlimentDetailsComponent } from './aliment-details/aliment-details.component';



@NgModule({
  declarations: [
    AppComponent,
    AlimentComponent,
    Page1Component,
    SquarifyDirective,
    AlimentDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MainServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
