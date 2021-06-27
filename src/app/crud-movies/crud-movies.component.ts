import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiMoviesService } from '../services/apiMovies.service';
import * as moment from 'moment';
import { YearRequired } from '../interface/year-required';
import { Router } from '@angular/router';

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
  submitted: boolean = false;

  selectedYear!: YearRequired;
  year: YearRequired[];

  errorMessage = {
    'title': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'price': [
      { type: 'required', message: ' Veuillez insérer un prix entre 1 et 15€ !' },
    ],
    'yearRequired': [
      { type: 'required', message: ' Selectionnez une proposition !' },
    ],
    'releaseDate': [
      { type: 'required', message: ' Ajoutez une date !' },
    ],
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _apiMoviesService: ApiMoviesService,
    private _messageService: MessageService,
    private _router: Router,
  ) {

    this.year = [
      { name: "-- Faites un choix: --", code: "" },
      { name: "Tous", code: "0" },
      { name: "Maternelle (-3)", code: "3" },
      { name: "Enfant (-7)", code: "7" },
      { name: "Adolescent (-12)", code: "12" },
      { name: "Adulte (-18)", code: "18" },
    ];

    this.movie = this._formBuilder.group({
      title: ["", [Validators.required, Validators.max(80)]],
      price: ["", [Validators.required, Validators.min(1), Validators.max(15)]],
      yearRequired: ["", [Validators.required, Validators.min(0), Validators.max(18)]],
      releaseDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveMovie() {
    this.submitted = true;
    const valid = this.movie.valid;
    let dataMovies = {
      title: this.movie.value.title,
      price: this.movie.value.price,
      yearRequired: this.movie.value.yearRequired.code,
      releaseDate: moment(this.movie.value.releaseDate).format('YYYY-MM-DD')
    }

    if (valid) {
      this._apiMoviesService.addMovies(dataMovies).subscribe(res => {
        console.log(res);
        this._messageService.add({ severity: 'success', summary: 'Création film:', detail: 'Ajout réussi' });

        this.movie.reset();
        this._router.navigate(['../movies']);

      }, error => {
        console.log(error);
        this._messageService.add({ severity: 'error', summary: 'Création film:', detail: 'Une erreur est survenue' });
      });
    }
  }

}


