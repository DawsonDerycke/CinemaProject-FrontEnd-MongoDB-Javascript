import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

const apiCustomers = "https://projet-mongodb.herokuapp.com/";
@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {


  constructor(private _httpClient: HttpClient) { }

  getCustomers(): Observable<Users[]> {
    return this._httpClient.get<Users[]>(apiCustomers + `/api/customers`);
  }
  
  getCustomersId(id: string): Observable<Users[]> {
    return this._httpClient.get<Users[]>(apiCustomers + `/api/customers/${id}`);
  }

  addCustomers(dataCustomers: any) {
    return this._httpClient.post(apiCustomers + `/api/customers`, dataCustomers);
  }

  updateCustomers(dataCustomers: any, id: string) {
    return this._httpClient.post(apiCustomers + `/api/customers/${id}`, dataCustomers);
  }

  deleteOneCustomer(idToDelete: string) {
    return this._httpClient.delete(apiCustomers + `/api/customers/${idToDelete}`);
  }

}
