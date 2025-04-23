import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GetallstudentComponent } from './getallstudent/getallstudent.component';
import { authGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:'getallstudent',
    component:GetallstudentComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
 
    children:[
      {
        path:'',
        component:AdminComponent
      },
      
      {
        path:'getallstudent',
        component:GetallstudentComponent
      }

    ],   canActivate:[authGuard],
  },
  {
    path:'forgetpw',
    component:ForgetpwComponent
  },
  {
    path:'resetpw',
    component:ResetpwComponent
  },
  {
    path:'navbar',
    component:NavbarComponent
  },
  
  {
    path: '**', // A wildcard route in case no route is matched
    component:ErrorComponent, // Redirect to the login page if the route doesn't exist
    // pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
