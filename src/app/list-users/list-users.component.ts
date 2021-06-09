import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomersService } from '../services/customers.service';
import { ApiCustomersService } from '../services/apiCustomers.service';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  providers: [MessageService],
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  users: any;
  cols: any;
  customers: any;
  msgs1!: Message[];

  constructor(
    private customersService: CustomersService,
    private apiService: ApiCustomersService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.getApi();

    // Colonne label property
    this.cols = [
      { field: 'firstName', header: 'Prénom' },
      { field: 'year', header: 'Age' },
      { field: 'movie', header: 'Film' },
      { field: 'seat', header: 'Siège' },
    ];
    // this.users = this.customersService.user;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  getApi() {
    this.apiService.getCustomers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    },
      error => {
        this.msgs1 = [
          {severity:'error', summary:'Erreur', detail:'Impossible d\'accéder à la BDD !'},
        ];
        console.log(error);
      });
  }

}
