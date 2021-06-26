import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiCustomersService } from '../services/apiCustomers.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Users } from '../models/users';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  customer!: FormGroup;
  @ViewChild('dt') dt!: Table;
  users: any;
  cols: any;
  user!: Users;
  msgs1!: Message[];
  userDialog!: boolean;
  submitted!: boolean;

  errorMessage = {
    'firstName': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'year': [
      { type: 'min', message: ' L\'age minimum est de 1 an !' },
      { type: 'max', message: ' L\'age maximum est de 120 an !' },
    ],
    'movie': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'seat': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
  }

  constructor(
    private _apiService: ApiCustomersService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
  ) {
    this.customer = this._formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      year: ["", [Validators.required, Validators.min(1), Validators.max(120)]],
      movie: ["", [Validators.required, Validators.maxLength(80)]],
      seat: ["", [Validators.required, Validators.maxLength(4)]],
      ticket: [false, Validators.required],
    });
  }

  ngOnInit(): void {

    this.getApi()

    // Colonne label property
    this.cols = [
      { field: 'firstName', header: 'Prenom' },
      { field: 'year', header: 'Age' },
      { field: 'movie', header: 'Film' },
      { field: 'seat', header: 'Siege' },
    ];

  }

  // Recherche
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  // Récupérer les données
  getApi() {
    this._apiService.getCustomers().subscribe(data => {
      this.users = data;

    }, error => {
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

  // Boite Modif
  editUser(rowData: any) {
    let id = rowData._id;
    this._apiService.getCustomersId(id).pipe(first()).subscribe(x => this.customer.patchValue(x));

    this.user = rowData;
    this.userDialog = true;
  }

  // Sauve Modif
  saveUpdate() {
    let id = this.user._id;
    let user = this.customer.value;

    this._confirmationService.confirm({
      message: 'Voulez-vous mettre à jour cette information \"' + user.firstName + '\" ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._apiService.updateCustomers(user, id).subscribe((data) => {
          console.log(data);
          this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
          this.userDialog = false;

          this.refreshList();
        }, error => {
          this.msgs1 = [
            { severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier l\'utilisateur !' },
          ];
          console.log(error);
        });
      }
    });
  }

  // Refresh 
  refreshList(): void {
    this.getApi();
  }

  // Supprimer 
  deleteUser(rowData: any) {
    this.user = rowData;
    let idToDelete = rowData._id;

    this._confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer \"' + this.user.firstName + '\" ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._apiService.deleteOneCustomer(idToDelete).subscribe(data => {
          this.users = data;
          this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });

          this.refreshList();
        }, error => {
          console.log(error);
          this.msgs1 = [
            { severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer l\'utilisateur !' },
          ];
        });
      }
    });
  }

}
