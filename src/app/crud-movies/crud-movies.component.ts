import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiMoviesService } from '../services/apiMovies.service';
import { MoviesService } from '../services/movies.service';
import * as moment from 'moment';
import { YearRequired } from '../interface/year-required';

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

  selectedYear!: YearRequired;
  year: YearRequired[];

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private apiMoviesService: ApiMoviesService,
    private messageService: MessageService,
  ) {

    this.year = [
      {name: "Faites un choix:", code: ""},
      {name: "Tous", code: "0"},
      {name: "Maternelle (-3)", code: "3"},
      {name: "Enfant (-7)", code: "7"},
      {name: "Adolescent (-12)", code: "12"},
      {name: "Adulte (-18)", code: "18"},
    ];

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
    let dataMovies = {
      title: this.movie.value.title,
      price: this.movie.value.price,
      yearRequired: this.movie.value.yearRequired.code,
      releaseDate: moment(this.movie.value.releaseDate).format('YYYY-MM-DD')
     
    }

    this.apiMoviesService.addMovies(dataMovies).subscribe(res => {
      console.log(res);
      this.messageService.add({ severity: 'success', summary: 'Création film:', detail: 'Ajout réussi' });
      
      this.movie.reset();
    },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Création film:', detail: 'Une erreur est survenue' });
      });
  }
}


