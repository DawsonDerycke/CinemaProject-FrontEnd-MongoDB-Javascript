import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CategoriesService } from '../services/categories.service';
import { ApiCategoriesService } from '../services/apiCategories.service';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  providers: [MessageService],
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  categories: any;
  cols: any;
  msgs1!: Message[];

  constructor(
    private categoriesService: CategoriesService,
    private apiService: ApiCategoriesService,
    ) { }

  ngOnInit(): void {

    this.getApi();

    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'category', header: 'Catégorie' },
      { field: 'duration', header: 'Durée en minutes' },
      { field: 'director', header: 'Réalisateur' },
      { field: 'actor', header: 'Acteur' }
    ];

    // this.categories = this.categoriesService.category;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  getApi() {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    },
      error => {
        this.msgs1 = [
          { severity: 'error', summary: 'Erreur', detail: 'Impossible d\'accéder à la BDD !' },
        ];
        console.log(error);
      });
  }

}
