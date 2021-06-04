import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-categories',
  templateUrl: './crud-categories.component.html',
  styleUrls: ['./crud-categories.component.scss']
})
export class CrudCategoriesComponent implements OnInit {
  cat!: FormGroup;
  title = new FormControl('');
  category = new FormControl('');
  duration = new FormControl('');
  director = new FormControl('');
  actor = new FormControl('');

  constructor(private formBuilder: FormBuilder) {

    this.cat = this.formBuilder.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      duration: ["", Validators.required],
      director: ["", Validators.required],
      actor: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveCat() {
    console.log(this.cat.value);
  }
}
