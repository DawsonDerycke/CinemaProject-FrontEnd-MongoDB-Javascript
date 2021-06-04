import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-movies',
  templateUrl: './crud-movies.component.html',
  styleUrls: ['./crud-movies.component.scss']
})
export class CrudMoviesComponent {
  date3!: Date;
  movie!: FormGroup;
  title = new FormControl('');
  price = new FormControl('');
  yearRequired = new FormControl('');
  releaseDate = new FormControl('');

  constructor(private formBuilder: FormBuilder) {

    this.movie = this.formBuilder.group({
      title: ["", Validators.required],
      price: ["", Validators.required],
      yearRequired: ["", Validators.required],
      releaseDate: ["", Validators.required],
    });
  }


  saveMovies() {
    console.log(this.movie.value);
  }
}
