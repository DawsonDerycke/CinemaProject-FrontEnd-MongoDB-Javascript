import { Component, OnInit  } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-crud-movies',
  templateUrl: './crud-movies.component.html',
  styleUrls: ['./crud-movies.component.scss']
})
export class CrudMoviesComponent implements OnInit  {
  date3!: Date;
  movie!: FormGroup;
  title = new FormControl('');
  price = new FormControl('');
  yearRequired = new FormControl('');
  releaseDate = new FormControl('');

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService) {

    this.movie = this.formBuilder.group({
      title: ["", Validators.required],
      price: ["", Validators.required],
      yearRequired: ["", Validators.required],
      releaseDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveMovie() {
    let data = this.movie.value;
    // console.log(this.movie.value);
    this.moviesService.saveMovieMongoDb(data);
  }
}
