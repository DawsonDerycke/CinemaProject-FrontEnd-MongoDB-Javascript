import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import categories from '../../assets/fake.json/categories.json'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'http://localhost:3000';
  category: any = categories;

  constructor(public httpClient: HttpClient) { }

  saveCatMongoDb(data: any) {
    console.log(data);
  }
}
