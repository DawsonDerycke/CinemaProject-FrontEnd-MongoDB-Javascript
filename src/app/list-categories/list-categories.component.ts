import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiCategoriesService } from '../services/apiCategories.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Categories } from '../models/categories';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  categories: any;
  modelCategories!: Categories[];
  modelCategory!: Categories;
  categoryDialog!: boolean;
  submitted!: boolean;
  cols: any;
  msgs1!: Message[];

  validation_message = {
    'title': [
      { type: 'required', message: 'Ce champ est obligatoire !'},
      { type: 'maxlength', message: 'Le champ peut contenir maximum 80 caractères !'},
    ],
    'category': [
      { type: 'required', message: 'Ce champ est obligatoire !'},
      { type: 'minlength', message: 'Le champ doit contenir minimum 3 caractères !'},
      { type: 'maxlength', message: 'Le champ peut contenir maximum 25 caractères !'},
    ],
    'duration': [
      { type: 'required', message: 'Ce champ est obligatoire !'},
      { type: 'min', message: 'La durée doit être de minimum 5 minutes !'},
      { type: 'max', message: 'La durée doit être de maximum 600 minutes !'},
    ],
    'director': [
      { type: 'required', message: 'Ce champ est obligatoire !'},
      { type: 'minlength', message: 'Le champ doit contenir minimum 3 caractères !'},
      { type: 'maxlength', message: 'Le champ peut contenir maximum 25 caractères !'},
    ],
    'actor': [
      { type: 'required', message: 'Ce champ est obligatoire !'},
      { type: 'minlength', message: 'Le champ doit contenir minimum 3 caractères !'},
      { type: 'maxlength', message: 'Le champ peut contenir maximum 25 caractères !'},
    ],

  }

  constructor(
    private apiService: ApiCategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {

    this.getApi();

    this.cols = [
      { field: 'title', header: 'Film' },
      { field: 'category', header: 'Catégorie' },
      { field: 'duration', header: 'Durée en minutes' },
      { field: 'director', header: 'Réalisateur' },
      { field: 'actor', header: 'Acteur' }
    ];
  }

  // Recherche
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  // Récupérer les données
  getApi() {
    this.apiService.getCategories().subscribe(data => {
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
    console.log(rowData);
    this.modelCategory = rowData;
    this.categoryDialog = true;
  }

  // Sauve modif
  saveUpdate() {
    let id = this.modelCategory._id;
    let category = this.modelCategory;
    console.log(id);

    this.confirmationService.confirm({
      message: 'Voulez-vous mettre à jour cette information: \"' + category.title + '\" ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.updateOneCategory(id, category).subscribe(data => {
          console.log(data);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
          this.categoryDialog = false;

        }, error => {
          console.log(error);
          this.msgs1 = [
            { severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier l\'utilisateur !' },
          ];
        });
      }
    });
  }

  // Supprimer
  deleteCategory(rowData: any) {
    this.modelCategory = rowData;
    let idToDelete = rowData._id;

    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + this.modelCategory.title + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteOneCategory(idToDelete).subscribe(data => {
          this.categories = data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });

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
