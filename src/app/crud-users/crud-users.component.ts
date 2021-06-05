import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.scss']
})
export class CrudUsersComponent implements OnInit {
  user!: FormGroup;
  firstName = new FormControl('');
  year = new FormControl('');
  movie = new FormControl('');
  seat = new FormControl('');

  constructor(private formBuilder: FormBuilder, private customersService: CustomersService) {

    this.user = this.formBuilder.group({
      firstName: ["", Validators.required],
      year: ["", Validators.required],
      movie: ["", Validators.required],
      seat: ["", Validators.required],
    });
   }

  ngOnInit(): void {
  }

  saveUser() {
    let data = this.user.value;
    console.log(this.user.value);
    this.customersService.saveUserMongoDb(data);
  }

}
