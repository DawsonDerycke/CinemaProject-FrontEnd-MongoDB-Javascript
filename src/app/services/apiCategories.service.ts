import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories';

const apiCategories= "https://projet-mongodb.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {


  constructor(private _httpClient: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this._httpClient.get<Categories[]>(apiCategories + `/api/categories`);
  } 

  getCategoryId(id: string): Observable<Categories[]> {
    return this._httpClient.get<Categories[]>(apiCategories + `/api/categories/${id}`);
  } 

  addCategories(dataCategories: any) {
    return this._httpClient.post(apiCategories + `/api/categories`, dataCategories);
  }

  updateCategory(id: string, dataCategory: any) {
    return this._httpClient.post(apiCategories + `/api/categories/${id}`, dataCategory);
  }

  deleteCategory(idToDelete: string) {
    return this._httpClient.delete(apiCategories + `/api/categories/${idToDelete}`);
  }

}
