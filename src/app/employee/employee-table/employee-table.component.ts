import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmployeeInfo } from 'src/app/types/types';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent  implements OnInit{
  formValue!: FormGroup; 

  employeeObj: EmployeeInfo = new EmployeeInfo;

  allEmp: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private api:ApiService
  ){

  }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      employeeName:[''],
      department:[''],
      salary:[''],
    })
  }
  close(){
this.router.navigate(["home"])
  }
  
  AddStudent(){
    this.employeeObj.empployeeName= this.formValue.value.empployeeName;
    this.employeeObj.department = this.formValue.value.department;
    this.employeeObj.salary = this.formValue.value.salary;
    this.api.postStudent(this.employeeObj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllStudent();
      this.formValue.reset();
    } })

  }

  AllStudent(){
    this.api.getStudent().subscribe(res => {
      this.allEmp = res;
    })
  }

  EditStudent(data:any){
    this.formValue.controls['empployeeName'].setValue(data.name);
    this.formValue.controls['department'].setValue(data.department);
    this.formValue.controls['salary'].setValue(data.salary);
    this.employeeObj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateStudent(){
    this.employeeObj.empployeeName = this.formValue.value.name;
    this.employeeObj.department = this.formValue.value.department;
    this.employeeObj.salary = this.formValue.value.salary;

   
  
    this.api.putStudent(this.employeeObj,this.employeeObj.id).subscribe(res => {
      alert("Data Updated");
      this.AllStudent();
      this.SaveShowBtn();
    })


  }


  DeleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe(res => {
      alert("are you sure want to delete");
      this.AllStudent();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }

}
