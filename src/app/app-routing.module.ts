import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';

const routes: Routes = [
  { path: 'emps', component: EmployeesComponent },
  { path: 'empsview', component: EmployeedataComponent },
  { path: 'emps/empdetails/:id', component: EmployeedetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
