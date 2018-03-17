import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component} from '../page1/page1.component';
import { NewAlimentComponent } from '../new-aliment/new-aliment.component';
const routes: Routes = [
  {
      path: '',
      component: Page1Component
  },
  {
    path: 'new-aliment',
    component: NewAlimentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
