import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmployeeInfo } from 'src/app/types/types';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {
  @ViewChild('closeModalButton') closeModalButton!: ElementRef; 
  public form!: FormGroup; 
  public employee: EmployeeInfo = new EmployeeInfo(); 
  public allEmployees: any; 
  public isUpdateMode: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      department: [''],
      salary: [''],
    });
    this.getAllEmployees(); // Fetch all employees on component initialization
  }


//add employee
  addEmployee(): void {
    this.isUpdateMode=true
    if (this.form.valid) {
      this.employee.name = this.form.value.name;
      this.employee.department = this.form.value.department;
      this.employee.salary = this.form.value.salary;
      this.api.postEmployee(this.employee).subscribe({
        next: (response) => {
          alert("Data Saved");
          this.getAllEmployees();
          this.form.reset();
          this.closeModal(); // Close the modal
       
        },
        error: (error) => {
          console.error('Error:', error);
          alert("Error occurred");
        },
      });
    } else {
      // Handle form validation error, e.g., display an error message.
      alert("Please fill in all required fields.");
    }
  }
  
//get all employee
  getAllEmployees(): void { 
    this.api.getEmployees().subscribe((res) => {
      this.allEmployees = res;
    });
  }
//edit employee
  editEmployee(data: any) { 
    this.form.setValue({
      name: data.name,
      department: data.department,
      salary: data.salary,
    });
    this.employee.id = data.id;
  }
//update employee
  updateEmployee(): void {
    this.employee.name = this.form.value.name;
    this.employee.department = this.form.value.department;
    this.employee.salary = this.form.value.salary;
    this.api.putEmployee(this.employee, this.employee.id).subscribe(() => {
      alert("Data Updated");
      this.getAllEmployees(); // Refresh the employee list
      this.closeModal();
    });
  }
//delete employee
  deleteEmployee(data: any): void { // Renamed from DeleteStudent to deleteEmployee
    if (confirm("Are you sure you want to delete?")) {
      this.api.deleteEmployee(data.id).subscribe(() => {
        alert("Data Deleted");
        this.getAllEmployees(); // Refresh the employee list
      });
    }
  }
//hide and show

  //close the modal
  closeModal() {
    // Use native DOM manipulation to trigger a click event on the close button
    this.closeModalButton?.nativeElement.click();
  }
}
