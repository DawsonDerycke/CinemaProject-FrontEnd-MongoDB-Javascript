import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiMoviesService } from '../services/apiMovies.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Movies } from '../models/movies';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  movies: any;
  modelMovies!: Movies[];
  modelMovie!: Movies;
  movieDialog!: boolean;
  submitted!: boolean;
  cols: any;
  msgs1!: Message[];

  constructor(
    private apiService: ApiMoviesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
  ) { }

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
