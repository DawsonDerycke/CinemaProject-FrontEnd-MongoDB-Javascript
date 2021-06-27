import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiCategoriesService } from '../services/apiCategories.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

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

  submitted: boolean = false;

  errorMessage = {
    'title': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'category': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
      { type: 'length', message: ' Le champ doit contenir minimum 3 caractères !' },
    ],
    'duration': [
      { type: 'required', message: ' Insérez une durée entre 5 et 600 minutes !' },
    ],
    'director': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
      { type: 'length', message: ' Le champ doit contenir minimum 3 caractères !' },
    ],
    'actor': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
      { type: 'length', message: ' Le champ doit contenir minimum 3 caractères !' },
    ],
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _apiCategoriesService: ApiCategoriesService,
    private _messageService: MessageService,
    private _router: Router,
  ) {
    this.cat = this._formBuilder.group({
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
    this.submitted = true;
    const valid = this.cat.valid;
    if (valid) {

      this._apiCategoriesService.addCategories(dataCategories).subscribe(res => {
        console.log(res)
        this._messageService.add({ severity: 'success', summary: 'Création catégorie:', detail: 'Ajout réussi' });

        this.cat.reset();
        this._router.navigate(['../categories']);
        
      }, error => {
        console.log(error);
        this._messageService.add({ severity: 'error', summary: 'Création catégorie:', detail: 'Une erreur est survenue' });
      });
    }
  }
}
