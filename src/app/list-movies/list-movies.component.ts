import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MoviesService } from '../services/movies.service';
import { ApiMoviesService } from '../services/apiMovies.service';
import { MessageService, Message } from 'primeng/api';


@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  providers: [MessageService],
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  movies: any;
  cols: any;
  msgs1!: Message[];

  constructor(private moviesService: MoviesService, private apiService: ApiMoviesService) { }

  ngOnInit(): void {

    this.getApi();

    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'price', header: 'Prix' },
      { field: 'yearRequired', header: 'Age minimum' },
      { field: 'releaseDate', header: 'Date de sortie' }
    ];

    // this.movies = this.moviesService.movie;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  getApi() {
    this.apiService.getMovies().subscribe(data => {
      this.movies = data;
      console.log(this.movies);
    },
      error => {
        this.msgs1 = [
          {severity:'error', summary:'Erreur', detail:'Impossible d\'accéder à la BDD !'},
        ];
        console.log(error);
      });
  }

}
