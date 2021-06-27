import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiCategoriesService } from '../services/apiCategories.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Categories } from '../models/categories';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  cat!: FormGroup;
  categories: any;
  modelCategory!: Categories;
  categoryDialog!: boolean;
  submitted!: boolean;
  cols: any;
  msgs1!: Message[];

  title = new FormControl('');
  category = new FormControl('');
  duration = new FormControl('');
  director = new FormControl('');
  actor = new FormControl('');

  errorMessage = {
    'title': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'category': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'duration': [
      { type: 'min', message: ' La durée est de minimum 5 minutes !' },
      { type: 'max', message: ' La durée est de maximum 600 minutes !' },
    ],
    'director': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
    'actor': [
      { type: 'required', message: ' Ce champ est obligatoire !' },
    ],
  }
  form: any;

  constructor(
    private _apiService: ApiCategoriesService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
  ) {
    this.cat = this._formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(80)]],
      category: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      duration: ["", [Validators.required, Validators.min(5), Validators.max(600)]],
      director: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      actor: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    });
  }

  loading: boolean = true;

  ngOnInit(): void {

    this.getApi();

    this.loading = false;

    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'category', header: 'Categorie' },
      { field: 'duration', header: 'Duree (minutes)' },
      { field: 'director', header: 'Realisateur' },
      { field: 'actor', header: 'Acteur' }
    ];
  }

  // Recherche
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  // Récupérer les données
  getApi() {
    this._apiService.getCategories().subscribe(data => {
      this.categories = data;

    }, error => {
      this.msgs1 = [
        { severity: 'error', summary: 'Erreur', detail: 'Impossible d\'accéder à la BDD !' },
      ];
      console.log(error);
    });
  }

  // Boite de dialogue
  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  // Boite modif
  editCategory(rowData: any) {
    let id = rowData._id;
    this._apiService.getCategoryId(id).pipe(first()).subscribe(x => this.cat.patchValue(x));

    this.modelCategory = rowData;
    this.categoryDialog = true;
  }

  // Sauve modif
  saveUpdate() {
    let id = this.modelCategory._id;
    let category = this.cat.value;

      this._confirmationService.confirm({
        message: 'Voulez-vous mettre à jour cette information: \"' + category.title + '\" ?',
        header: 'Confirmer',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this._apiService.updateCategory(id, category).subscribe(data => {
            console.log(data);
            
            this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
            this.categoryDialog = false;

            this.refreshList();
          }, error => {
            console.log(error);
            this.msgs1 = [
              { severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier l\'utilisateur !' },
            ];
          });
        }
    });
  }

  // Refresh 
  refreshList(): void {
    this.getApi();
  }

  // Supprimer
  deleteCategory(rowData: any) {
    this.modelCategory = rowData;
    let idToDelete = rowData._id;

    this._confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer \"' + this.modelCategory.title + '\" ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._apiService.deleteCategory(idToDelete).subscribe(data => {
          this.categories = data;
          this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });

          this.refreshList();
        }, error => {
          this.msgs1 = [
            { severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le film !' },
          ];
          console.log(error);
        });
      }
    });
  }

}
