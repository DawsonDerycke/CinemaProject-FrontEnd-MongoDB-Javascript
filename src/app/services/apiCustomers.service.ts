import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers';

const apiCustomers= "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {


  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(apiCustomers + `/api/customers`);
  } 

  addCustomers(dataCustomers: any){
    console.log(dataCustomers);
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.httpClient.post(`http://localhost:3000/api/customers`, dataCustomers, config);
  }

}
