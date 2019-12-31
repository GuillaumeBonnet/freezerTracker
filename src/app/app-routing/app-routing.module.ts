import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageMyFreezerComponent } from '../pageMyFreezer/pageMyFreezer.component';
import { NewAlimentComponent } from '../new-aliment/new-aliment.component';
import { InformationsComponent } from '../informations/informations.component';
import { FreezersComponent } from '../freezers/freezers.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard }  from '../auth/auth.guard';
import { VerificationRedirectionComponent } from '../verification-redirection/verification-redirection.component';

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
	{
		path: 'freezers',
		component: FreezersComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'confirm-registration/:token', //This path is reference in the back-end => don't change
		component: VerificationRedirectionComponent
	},
	{
		path: '**',
		component: FreezersComponent,
		canActivate: [AuthGuard],
	},
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
