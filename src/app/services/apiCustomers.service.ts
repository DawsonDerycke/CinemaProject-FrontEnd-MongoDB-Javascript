import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

const apiCustomers = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {


  constructor(public httpClient: HttpClient) { }

  getCustomers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(apiCustomers + `/api/customers`);
  }

  addCustomers(dataCustomers: any) {
    return this.httpClient.post(apiCustomers + `/api/customers`, dataCustomers);
  }

  updateCustomers(dataCustomers: any, id: any) {
    return this.httpClient.post(apiCustomers + `/api/customers/${id}`, dataCustomers);
  }

  deleteOneCustomer(idToDelete: any) {
    return this.httpClient.delete(apiCustomers + `/api/customers/${idToDelete}`);
  }

}
