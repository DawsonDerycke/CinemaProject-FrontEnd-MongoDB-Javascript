import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
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

}
