import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories';

const apiCategories= "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {


  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.httpClient.get<Categories[]>(apiCategories + `/api/categories`);
  } 

}
