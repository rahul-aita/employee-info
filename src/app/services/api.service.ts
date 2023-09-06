import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Create a BehaviorSubject to hold the response data
  private responseDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Expose an observable to other components
  responseData$: Observable<any> = this.responseDataSubject.asObservable();

  constructor(private _http:HttpClient) { }
   // Post Method For Add Student
   postEmployee(data:any)
   {
     return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=> {
       return res
     }))
   }
 
     // Get Method For All Student
     getEmployees()
     {
       return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=> {
         return res
       }))
     }
 
       // Put Method For Update Student
       putEmployee(data:any, id:number)
   {
     return this._http.put<any>("http://localhost:3000/posts/" + id,data).pipe(map((res:any)=> {
       return res
     }))
   }
 
   // Delete Method For Update Student
   deleteEmployee(id:number)
   {
     return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res:any)=> {
       return res
     }))
   }
     

   //add data

   addEmployee(employeeData: any): void {
        // Update the BehaviorSubject with the response data
        this.responseDataSubject.next(employeeData);
     
  }
}
