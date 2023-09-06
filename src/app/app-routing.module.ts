import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: 'home', // Use 'home' without the leading slash
    component: HeaderComponent,
    children: [
      {
        path: 'emp',
        loadChildren: () => import('src/app/employee/employee.module').then((m) => m.EmployeeModule)
      }
    ]
  },
  {
    path: '', // This is the default route
    redirectTo: 'home', // Redirect to '/home' when the root path is accessed
    pathMatch: 'full' // This ensures a full match for the empty path
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

