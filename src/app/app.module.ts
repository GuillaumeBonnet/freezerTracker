import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AlimentComponent } from './aliment/aliment.component';
import { Page1Component } from './page1/page1.component';
import { SquarifyDirective } from './Directives/squarify.directive';
import {MainServiceService} from './Services/main-service.service';
import { DataService } from './Services/data.service';
import { BackendService } from './Services/backend.service';
import { AlimentDetailsComponent } from './aliment-details/aliment-details.component';

import  { AppRoutingModule } from './app-routing/app-routing.module';
import { NewAlimentComponent } from './new-aliment/new-aliment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/throttleTime";

import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LOCALE_ID } from '@angular/core';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule, //needs to be after BrowserModule
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MainServiceService, DataService, BackendService, {provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
