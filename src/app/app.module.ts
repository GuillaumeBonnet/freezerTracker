import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AlimentComponent } from './aliment/aliment.component';
import { Page1Component } from './page1/page1.component';
import { SquarifyDirective } from './Directives/squarify.directive';
import {MainServiceService} from './Services/main-service.service';
import { AlimentDetailsComponent } from './aliment-details/aliment-details.component';

import  { AppRoutingModule } from './app-routing/app-routing.module';
import { NewAlimentComponent } from './new-aliment/new-aliment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/throttleTime";

@NgModule({
  declarations: [
    AppComponent,
    AlimentComponent,
    Page1Component,
    SquarifyDirective,
    AlimentDetailsComponent,
    NewAlimentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MainServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
