import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import users from '../../assets/fake.json/customers.json';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url = "http://localhost:3000";
  user: any = users;

  constructor(public httpClient: HttpClient) { }

  saveUserMongoDb(data: any) {
    console.log(data);
    
  }




}
