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

  constructor(private formBuilder: FormBuilder, private customersService: CustomersService, private apiCustomersService: ApiCustomersService
    ,private messageService: MessageService) {

    this.user = this.formBuilder.group({
      firstName: ["", Validators.required],
      year: ["", Validators.required],
      movie: ["", Validators.required],
      seat: ["", Validators.required],
      ticket: [false, Validators.required],
    });
   }

  ngOnInit(): void {
  }

  saveUser() {
    let dataCustomers = this.user.value;
    console.log(this.user.value);
    //this.customersService.saveUserMongoDb(data);
    
    this.apiCustomersService.addCustomers(dataCustomers).subscribe(res => {
      console.log(res)
      this.messageService.add({ severity: 'success', summary:' Message', detail:'Ajout réussi' });
    },
    error => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary:' Message', detail:'Une erreur est survenue' });
    });


  }

}
