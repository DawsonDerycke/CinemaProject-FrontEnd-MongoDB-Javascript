import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  users: any;
  cols: any;

  constructor(private customersService: CustomersService) { }

  ngOnInit() {

    this.cols = [
      { field: 'firstName', header: 'Prénom' },
      { field: 'year', header: 'Age' },
      { field: 'movie', header: 'Film' },
      { field: 'seat', header: 'Siège' }
    ];

    this.users = this.customersService.user;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  
}
