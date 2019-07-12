import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageMyFreezerComponent} from '../pageMyFreezer/pageMyFreezer.component';
import { NewAlimentComponent } from '../new-aliment/new-aliment.component';
import { InformationsComponent } from '../informations/informations.component';
const routes: Routes = [
  {
      path: '',
      component: PageMyFreezerComponent
  },
  {
    path: 'new-aliment',
    component: NewAlimentComponent
  },
  {
    path: 'edit-aliment',
    component: NewAlimentComponent
  },
  {
    path: 'about',
    component: InformationsComponent
  },
  // {
  //   path: 'freezers',
  //   component: freezersComponent
  // }
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
