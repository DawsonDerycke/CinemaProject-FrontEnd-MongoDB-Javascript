import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiMoviesService } from '../services/apiMovies.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Movies } from '../models/movies';
import { DatePipe } from '@angular/common';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  movie!: FormGroup;
  @ViewChild('dt') dt!: Table;
  movies: any;
  modelMovie!: Movies;
  movieDialog!: boolean;
  submitted!: boolean;
  cols: any;
  msgs1!: Message[];

  errorMessage = {
    'title': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'price': [
      { type: 'min', message: ' Le prix ne peut pas être en dessous de 1€ !' },
      { type: 'max', message: ' Le prix ne peut pas être au dessus de 15€ !' },
    ],
    'yearRequired': [
      { type: 'required', message: ' Selectionnez une proposition !' },
    ],
    'releaseDate': [
      { type: 'required', message: ' Ajoutez une date !' },
    ],
  }

  constructor(
    private apiService: ApiMoviesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
  ) {
    this.movie = this.formBuilder.group({
      title: ["", [Validators.required, Validators.max(80)]],
      price: ["", [Validators.required, Validators.min(1), Validators.max(15)]],
      yearRequired: ["", [Validators.required, Validators.min(0), Validators.max(18)]],
      releaseDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {

    this.getApi();

    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'price', header: 'Prix' },
      { field: 'yearRequired', header: 'Age minimum' },
      { field: 'releaseDate', header: 'Date de sortie' }
    ];

  }

  // Recherche
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  // Récupérer les données
  getApi() {
    this.apiService.getMovies().subscribe(data => {
      this.movies = data;

    }, error => {
      this.msgs1 = [
        { severity: 'error', summary: 'Erreur', detail: 'Impossible d\'accéder à la BDD !' },
      ];
      console.log(error);
    });
  }

  // Boite de dialogue
  hideDialog() {
    this.movieDialog = false;
    this.submitted = false;
  }
  // Boite modif
  editMovie(rowData: any) {
    this.modelMovie = {
      _id: rowData._id,
      title: rowData.title,
      price: rowData.price,
      yearRequired: rowData.yearRequired,
      releaseDate: this.datePipe.transform(rowData.releaseDate, 'yyyy-MM-dd')
    };

    console.log(this.modelMovie);
    this.movieDialog = true;
  }

  // Sauve modif
  saveUpdate() {
    let id = this.modelMovie._id;
    let movie = this.modelMovie;

    this.confirmationService.confirm({
      message: 'Voulez-vous mettre à jour cette information \"' + movie.title + '\" ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.updateOneMovie(id, movie).subscribe(data => {
          console.log(data);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
          this.movieDialog = false;

        }, error => {
          console.log(error);
          this.msgs1 = [
            { severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier l\'utilisateur !' },
          ];
        });
      }
    });
  }

  // Supprimer
  deleteMovie(rowData: any) {
    this.modelMovie = rowData;
    let idToDelete = rowData._id;

    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + this.modelMovie.title + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteOneMovie(idToDelete).subscribe(data => {
          this.movies = data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });

        }, error => {
          this.msgs1 = [
            { severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le film !' },
          ];
          console.log(error);
        });
      }
    });
  }

}
