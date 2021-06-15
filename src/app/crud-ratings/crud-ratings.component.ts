import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-ratings',
  templateUrl: './crud-ratings.component.html',
  styleUrls: ['./crud-ratings.component.scss']
})
export class CrudRatingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveRating() {
    console.log('ok');
  }

}
