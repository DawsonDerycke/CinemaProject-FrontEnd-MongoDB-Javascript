import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiMoviesService } from '../services/apiMovies.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-crud-movies',
  templateUrl: './crud-movies.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./crud-movies.component.scss']
})
export class CrudMoviesComponent implements OnInit {
  movie!: FormGroup;
  title = new FormControl('');
  price = new FormControl('');
  yearRequired = new FormControl('');
  releaseDate = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private apiMoviesService: ApiMoviesService,
    private messageService: MessageService,
  ) {

    this.movie = this.formBuilder.group({
      title: ["", [Validators.required, Validators.max(80)]],
      price: ["", [Validators.required, Validators.min(1), Validators.max(15)]],
      yearRequired: ["", [Validators.required, Validators.min(0), Validators.max(18)]],
      releaseDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveMovie() {
    // Erreur date
    let dataMovies = this.movie.value;
    console.log(dataMovies);

    this.apiMoviesService.addMovies(dataMovies).subscribe(res => {
      console.log(res);
      this.messageService.add({ severity: 'success', summary: ' Message', detail: 'Ajout réussi' });
    },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: ' Message', detail: 'Une erreur est survenue' });
      });
  }
}
