import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = "http://localhost:3000";

  constructor(public httpClient: HttpClient) { }

  saveMovieMongoDb(data: any) {
    console.log(data);
  }
}
