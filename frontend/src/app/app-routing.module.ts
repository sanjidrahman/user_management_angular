import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LogibComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminUsersComponent } from './component/admin-users/admin-users.component';
import { AdminEditComponent } from './component/admin-edit/admin-edit.component';
import { AdminCreateUserComponent } from './component/admin-create-user/admin-create-user.component';

const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path : 'login' , component : LogibComponent},
  { path : 'register' , component : RegisterComponent},
  { path : 'admin' , component : AdminLoginComponent},
  { path : 'edit_user' , component : AdminEditComponent},
  { path : 'add_user' , component : AdminCreateUserComponent},
  { path : 'admin/dashboard' , component : AdminUsersComponent},
  { path : 'admin/dashboard/edit_user/:id' , component : AdminEditComponent},
  { path : 'admin/dashboard/add_user' , component : AdminCreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
