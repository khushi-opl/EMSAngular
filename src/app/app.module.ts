import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateComponent } from './update/update.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetallstudentComponent } from './getallstudent/getallstudent.component';
import { InterceptorService } from './interceptor.service';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { HttpcallService } from './httpcall.service';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgetpwComponent,
    ResetpwComponent,
    NavbarComponent,
    UpdateComponent,
    UpdateDialogComponent,
    DeleteDialogComponent,
    SaveDialogComponent,
    GetallstudentComponent,
    LogoutDialogComponent,
    ErrorComponent,
    AdminComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  providers: [
    HttpcallService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
