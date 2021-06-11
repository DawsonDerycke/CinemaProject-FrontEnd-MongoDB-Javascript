import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomersService } from '../services/customers.service';
import { ApiCustomersService } from '../services/apiCustomers.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Users } from '../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  users: any;
  rowData: any;
  //product: Users;
  cols: any;
  customers!: Users[];
  customer!: Users;
  user!: Users;
  msgs1!: Message[];
  userDialog!: boolean;
  submitted!: boolean;

  constructor(
    private customersService: CustomersService,
    private apiService: ApiCustomersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.getApi();
    this.apiService.getCustomers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
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
          { severity: 'error', summary: 'Erreur', detail: 'Impossible d\'accéder à la BDD !' },
        ];
        console.log(error);
      });
  }

  // Boite de dialogue
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  editUser(rowData: any) {
    console.log(rowData);
    this.user = rowData;
    this.userDialog = true;
  }

  saveUpdate() {
    let id = this.user._id;
    let user = this.user;
    console.log(id);
    console.log(user);

    this.confirmationService.confirm({
      message: 'Voulez-vous mettre à jour cette information ' + user.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.updateCustomers(user, id).subscribe(data => {
          this.users = data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
        },
          error => {
            this.msgs1 = [
              { severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier l\'utilisateur !' },
            ];
            console.log(error);
          });
      }
    });
  }

  deleteUser(rowData: any) {
    console.log(rowData);
    this.user = rowData;
    let idToDelete = rowData._id;
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + this.user.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteOneCustomer(idToDelete).subscribe(data => {
          this.users = data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          // this.router.navigate(['users']);
        },
          error => {
            this.msgs1 = [
              { severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer l\'utilisateur !' },
            ];
            console.log(error);
          });

      }
    });
  }

}
