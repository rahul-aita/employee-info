import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';

const routes: Routes = [
  {
    path: 'emp',
    component: EmployeeTableComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
