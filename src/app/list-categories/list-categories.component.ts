import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CategoriesService } from '../services/categories.service';
import { ApiCategoriesService } from '../services/apiCategories.service';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Categories } from '../models/categories';

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

  constructor(
    private categoriesService: CategoriesService,
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
      console.log(this.categories);
    },
      error => {
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
          console.log(category);
          this.apiService.updateOneCategory(id, category).subscribe(data => {
            this.categories = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
          },
            error => {
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
        },
          error => {
            this.msgs1 = [
              { severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le film !' },
            ];
            console.log(error);
          });

      }
    });
  }
}
