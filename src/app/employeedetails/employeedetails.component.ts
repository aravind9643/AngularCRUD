import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  id;
  employeesDetails;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('application_id', '5c0121ec34841d67d12c05a1')
      .set('app_user_token', 'a2b28bb06b58edd514684e2ff481e1a52cb1bf26ce642674a26f4d5af583d50b')
      .set('portal_type', 'AP')
      .set('publish_type', 'work')
      .set('app_user_ip', '115.248.118.242')
      .set('Content-Type', 'application/json');
    this.http.get('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s/' + this.id, { headers }).subscribe(data => {
      // console.log(data['data']);
      this.employeesDetails = data['data'];
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
