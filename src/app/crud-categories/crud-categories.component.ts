import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';

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

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService) {

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
    let data = this.cat.value;
    //console.log(this.cat.value);
    this.categoriesService.saveCatMongoDb(data);
  }
}
