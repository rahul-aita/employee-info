import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EmployeeModule } from './employee/employee.module';
import { HeaderComponent } from './header/header.component';
import { UpdateEmployeeComponent } from './modal/update-employee/update-employee.component';
import { HttpClientModule } from '@angular/common/http';
;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    EmployeeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
