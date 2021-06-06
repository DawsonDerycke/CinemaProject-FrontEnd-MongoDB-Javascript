import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import movies from '../../assets/fake.json/movies.json';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = "http://localhost:3000";
  movie: any = movies;

  constructor(public httpClient: HttpClient) { }

  saveMovieMongoDb(data: any) {
    console.log(data);
  }
}
