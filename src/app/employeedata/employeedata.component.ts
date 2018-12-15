import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.css']
})
export class EmployeedataComponent implements OnInit {
  employees;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('application_id', '5c0121ec34841d67d12c05a1')
      .set('app_user_token', 'a2b28bb06b58edd514684e2ff481e1a52cb1bf26ce642674a26f4d5af583d50b')
      .set('portal_type', 'AP')
      .set('publish_type', 'work')
      .set('app_user_ip', '115.248.118.242')
      .set('Content-Type', 'application/json')
    this.http.get('https://brisol.ajrgroup.in/sr-q/api/apps/5c0121ec34841d67d12c05a1/sc_employees3s', { headers }).subscribe(data => {
      console.log(data['data']);
      this.employees = data['data'];
    });

  }

}
