import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiCategoriesService } from '../services/apiCategories.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-crud-categories',
  templateUrl: './crud-categories.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./crud-categories.component.scss']
})
export class CrudCategoriesComponent implements OnInit {
  cat!: FormGroup;
  title = new FormControl('');
  category = new FormControl('');
  duration = new FormControl('');
  director = new FormControl('');
  actor = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private apiCategoriesService: ApiCategoriesService,
    private messageService: MessageService,
  ) {

    this.cat = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(80)]],
      category: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      duration: ["", [Validators.required, Validators.min(5), Validators.max(600)]],
      director: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      actor: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    });
  }

  ngOnInit(): void {
  }

  saveCat() {
    let dataCategories = this.cat.value;

    this.apiCategoriesService.addCategories(dataCategories).subscribe(res => {
      console.log(res)
      this.messageService.add({ severity: 'success', summary: 'Création catégorie:', detail: 'Ajout réussi' });

      this.cat.reset();
    }, error => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Création catégorie:', detail: 'Une erreur est survenue' });
    });
  }
}
