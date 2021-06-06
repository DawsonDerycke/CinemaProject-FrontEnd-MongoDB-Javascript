import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  movies: any;
  cols: any;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'price', header: 'Prix' },
      { field: 'yearRequired', header: 'Age minimum' },
      { field: 'releaseDate', header: 'Date de sortie' }
    ];

    this.movies = this.moviesService.movie;
  }



}
