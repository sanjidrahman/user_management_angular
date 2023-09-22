import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavComponent } from './component/nav/nav.component';
import { LogibComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store';
import { profileReducer, userReducer } from './component/state/app.reducers';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminUsersComponent } from './component/admin-users/admin-users.component';
import { appEffects } from './component/state/app.effects';
import { UserServicesService } from './service/user-services.service';
import { AdminEditComponent } from './component/admin-edit/admin-edit.component';
import { AdminCreateUserComponent } from './component/admin-create-user/admin-create-user.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LogibComponent,
    RegisterComponent,
    AdminNavComponent,
    AdminLoginComponent,
    AdminUsersComponent,
    AdminEditComponent,
    AdminCreateUserComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([appEffects]),
    StoreModule.forRoot({ allUsers: userReducer , userProfile: profileReducer }),
    StoreRouterConnectingModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [UserServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
