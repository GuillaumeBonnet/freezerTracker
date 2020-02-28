import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';




import { AppComponent } from './app.component';
import { AlimentComponent } from './aliment/aliment.component';
import { FreezerContent } from './freezerContent/freezerContent.component';
import { SquarifyDirective } from './Directives/squarify.directive';
import { MainServiceService } from './Services/main-service.service';
import { DataService } from './Services/data.service';
import { environment } from '../environments/environment';
import { AlimentDetailsComponent } from './aliment-details/aliment-details.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { NewAlimentComponent } from './new-aliment/new-aliment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LOCALE_ID } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { InformationsComponent } from './informations/informations.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { FreezersComponent } from './freezers/freezers.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import  { MatDialogModule } from '@angular/material/dialog';
import { ClickStopPropagationDirective } from './Directives/click-stop-propagation.directive';
import { PopUpFreezerMenuComponent } from './pop-up-freezer-menu/pop-up-freezer-menu.component';
import { PopUpDeleteComponent } from './pop-up-delete/pop-up-delete.component';
import { PopUpRenameFreezerComponent } from './pop-up-rename-freezer/pop-up-rename-freezer.component';
import { LoginComponent } from './login/login.component';
import { VerificationRedirectionComponent } from './verification-redirection/verification-redirection.component'
import { InterceptorXsrfHeaderWritterService } from './Services/interceptor-xsrf-header-writter.service';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { EditAlimentComponent } from './edit-aliment/edit-aliment.component';
@NgModule({
	declarations: [
		AppComponent,
		AlimentComponent,
		FreezerContent,
		SquarifyDirective,
		AlimentDetailsComponent,
		NewAlimentComponent,
		MenuComponent,
		InformationsComponent,
		MenuItemComponent,
		FreezersComponent,
		ClickStopPropagationDirective,
		PopUpFreezerMenuComponent,
		PopUpDeleteComponent,
		PopUpRenameFreezerComponent,
		LoginComponent,
		VerificationRedirectionComponent,
		RegistrationComponent,
		EditAlimentComponent,
	],
	entryComponents: [
		PopUpFreezerMenuComponent,
		PopUpDeleteComponent,
		PopUpRenameFreezerComponent,
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
		MatInputModule,
		HttpClientModule,
		MatCardModule,
		MatButtonModule,
		MatDialogModule,
	],
	providers: [
		MainServiceService,
		DataService,
		{provide: 'BackendService', useClass: environment.BackendService},
		AuthGuard,
		{ provide: LOCALE_ID, useValue: 'en-US' },
		CookieService,
		{ provide: HTTP_INTERCEPTORS, useClass: InterceptorXsrfHeaderWritterService, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
