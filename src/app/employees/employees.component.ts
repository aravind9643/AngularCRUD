import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpDetails, Data } from './employees.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  formdata: FormGroup;
  employeesData;
  editEmployeesData;
  getid;
  row_version: string;
  showbtn: boolean = false;
  showform: boolean = false;
  showdatails: boolean = true;
  Employee: EmpDetails;
  Employees: EmpDetails[] = new Array<EmpDetails>();
  headers: HttpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('application_id', '5c0121ec34841d67d12c05a1')
    .set('app_user_token', 'a2b28bb06b58edd514684e2ff481e1a52cb1bf26ce642674a26f4d5af583d50b')
    .set('portal_type', 'AP')
    .set('publish_type', 'work')
    .set('app_user_ip', '115.248.118.242')
    .set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
    this.Employee = new EmpDetails();
    this.loadData();
  }

  ngOnInit() {
    var formbuild = new FormBuilder();
    this.formdata = formbuild.group({
      ID: ["", Validators.required],
      Name: ["", Validators.required],
      Gender: ["", Validators.required],
      Mobile: ["", [Validators.required, Validators.maxLength(10)]],
      Address: ["", [Validators.required]]
    });
  }
  loadData() {
    this.http.get('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s', { headers: this.headers }).subscribe(data => {
      this.employeesData = data['data'];
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
  }
  showRegForm() {
    this.showform = true;
    this.showdatails = false;
  }
  cancelForm() {
    this.showform = false;
    this.showbtn = false;
    this.showdatails = true;
    this.Employee = new EmpDetails();
  }
  addEmp(emp) {
    this.http.post('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s', emp, { headers: this.headers }).subscribe(data => {
      alert("Added Successfully");
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
    this.Employee = new EmpDetails();
    this.showform = false;
    this.showdatails = true;
  }
  editEmp(emp) {
    this.http.get('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s/' + emp.id, { headers: this.headers }).subscribe(data => {
      this.Employee.data = data['data'];
      this.row_version = data['data'].row_version;
      this.getid = data['data'].id;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
    this.showbtn = true;
    this.showform = true;
    this.showdatails = false;
  }
  modEmp(emp) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('application_id', '5c0121ec34841d67d12c05a1')
      .set('app_user_token', 'a2b28bb06b58edd514684e2ff481e1a52cb1bf26ce642674a26f4d5af583d50b')
      .set('portal_type', 'AP')
      .set('publish_type', 'work')
      .set('app_user_ip', '115.248.118.242')
      .set('Content-Type', 'application/json')
      .set('row_version', this.row_version);
    this.http.put('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s/' + this.getid, emp, { headers }).subscribe(data => {
      alert("Modified Successfully");
      this.Employee = new EmpDetails();
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
    this.showform = false;
    this.showdatails = true;
    this.showbtn = false;
  }
  delEmp(emp) {

    if (confirm("Do You want to Delete? ")) {
      let headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('application_id', '5c0121ec34841d67d12c05a1')
        .set('app_user_token', 'a2b28bb06b58edd514684e2ff481e1a52cb1bf26ce642674a26f4d5af583d50b')
        .set('portal_type', 'AP')
        .set('publish_type', 'work')
        .set('app_user_ip', '115.248.118.242')
        .set('Content-Type', 'application/json')
        .set('row_version', emp.row_version);
      this.http.delete('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s/' + emp.id, { headers }).subscribe(data => {
        alert("Deleted Successfully");
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("Client-side error occured.");
          } else {
            alert("Server-side error occured.");
          }
        });
    }
  }
}
