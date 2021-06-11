import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers';

const apiCustomers = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {


  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(apiCustomers + `/api/customers`);
  }

  addCustomers(dataCustomers: any) {
    return this.httpClient.post(apiCustomers + `/api/customers`, dataCustomers);
  }

  updateCustomers(user: any, id: any) {
    return this.httpClient.post(apiCustomers + `/api/customers/${id}`, user);
  }

  deleteOneCustomer(idToDelete: any) {
    return this.httpClient.delete(apiCustomers + `/api/customers/${idToDelete}`);
  }

}
