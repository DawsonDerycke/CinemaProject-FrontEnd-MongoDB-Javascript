import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) { }

  saveCatMongoDb(data: any) {
    console.log(data);
  }
}
