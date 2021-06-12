import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../services/customers.service';
import { ApiCustomersService } from '../services/apiCustomers.service';
import { MessageService, ConfirmationService } from 'primeng/api';


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

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private apiCustomersService: ApiCustomersService,
    private messageService: MessageService
  ) {

    this.user = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      year: ["", [Validators.required, Validators.min(1), Validators.max(120)]],
      movie: ["", [Validators.required, Validators.maxLength(80)]],
      seat: ["", [Validators.required, Validators.maxLength(4)]],
      ticket: [false, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveUser() {
    let dataCustomers = this.user.value;

    this.apiCustomersService.addCustomers(dataCustomers).subscribe(res => {
      console.log(res)
      this.messageService.add({ severity: 'success', summary: ' Message', detail: 'Ajout réussi' });
    },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: ' Message', detail: 'Une erreur est survenue' });
      });
  }

}
