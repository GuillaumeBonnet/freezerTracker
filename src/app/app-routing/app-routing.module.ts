import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FreezerContent } from '../freezerContent/freezerContent.component'
import { NewAlimentComponent } from '../new-aliment/new-aliment.component'
import { InformationsComponent } from '../informations/informations.component'
import { FreezersComponent } from '../freezers/freezers.component'
import { LoginComponent } from '../login/login.component'
import { AuthGuard } from '../auth/auth.guard'
import { VerificationRedirectionComponent } from '../verification-redirection/verification-redirection.component'
import { RegistrationComponent } from '../registration/registration.component'
import { EditAlimentComponent } from '../edit-aliment/edit-aliment.component'

const routes: Routes = [
	{
		path: '',
		component: InformationsComponent,
		pathMatch: 'full',
	},
	{
		path: 'freezers/:freezerId/new-aliment',
		component: NewAlimentComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'freezers/:freezerId/edit-aliment/:alimentId',
		component: EditAlimentComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'freezers',
		component: FreezersComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'freezers/:freezerId',
		component: FreezerContent,
		canActivate: [AuthGuard],
	},
	{
		path: 'about',
		component: InformationsComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'registration',
		component: RegistrationComponent,
	},
	{
		path: 'confirm-registration/:token', //This path is reference in the back-end => don't change
		component: VerificationRedirectionComponent,
	},
	{
		path: '**',
		component: InformationsComponent,
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}
