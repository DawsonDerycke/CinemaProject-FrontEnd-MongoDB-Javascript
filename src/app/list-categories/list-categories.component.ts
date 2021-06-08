import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  categories: any;
  cols: any;

  constructor(private categoriesService: CategoriesService) { }
  
  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'category', header: 'Catégorie' },
      { field: 'director', header: 'Réalisateur' },
      { field: 'actor', header: 'Acteur' }
  ];

  this.categories = this.categoriesService.category;
  }
  
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

}
