import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-ratings',
  templateUrl: './list-ratings.component.html',
  styleUrls: ['./list-ratings.component.scss']
})
export class ListRatingsComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  ratings!: any;
  cols: any;

  constructor() { }

  ngOnInit(): void {

    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'rating', header: 'Notes' },

    ];
  }

  // Recherche
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

}
