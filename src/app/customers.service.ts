import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
//import { throwError } from 'rxjs';
//import { retry, catchError } from 'rxjs/operators';
import { Customers } from './models/customers';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url = "http://localhost:3000";

  constructor(public httpClient: HttpClient) { }

  saveUserMongoDb(data: any) {
    console.log(data);
    
  }




}
