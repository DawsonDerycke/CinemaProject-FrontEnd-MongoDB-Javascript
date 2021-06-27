import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiCustomersService } from '../services/apiCustomers.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./crud-users.component.scss']
})
export class CrudUsersComponent implements OnInit {
  user!: FormGroup;
  firstName = new FormControl('');
  year = new FormControl('');
  movie = new FormControl('');
  seat = new FormControl('');

  submitted: boolean = false;

  errorMessage = {
    'firstName': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
      { type: 'length', message: ' Le champ doit contenir minimum 2 caractères !' },
    ],
    'year': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'movie': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'seat': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _apiCustomersService: ApiCustomersService,
    private _messageService: MessageService,
    private _router: Router,
  ) {

    this.user = this._formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      year: ["", [Validators.required, Validators.min(1), Validators.max(120)]],
      movie: ["", [Validators.required, Validators.maxLength(80)]],
      seat: ["", [Validators.required, Validators.maxLength(4)]],
      ticket: [false, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.user.controls;
  }

  saveUser() {
    let dataCustomers = this.user.value;
    this.submitted = true;
    const valid = this.user.valid;

    if (valid) {
      this._apiCustomersService.addCustomers(dataCustomers).subscribe(res => {
        console.log(res)
        this._messageService.add({ severity: 'success', summary: 'Création client:', detail: 'Ajout réussi' });

        this.user.reset();
        this._router.navigate(['../users']);

      }, error => {
        console.log(error);
        this._messageService.add({ severity: 'error', summary: 'Création client:', detail: 'Une erreur est survenue' });
      });
    }
  }

}
