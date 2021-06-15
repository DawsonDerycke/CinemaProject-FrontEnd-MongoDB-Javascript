// Angular
import { Component } from '@angular/core';
// Primeng
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    items!: MegaMenuItem[];


    ngOnInit() {
        this.items = [
            {
                label: 'Films', icon: 'pi pi-fw pi-video',
                items: [
                    [
                        {
                            label: 'BDD:',
                            items:
                                [
                                    { label: 'Tableau films', routerLink: 'movies' },
                                    { label: 'Tableau notes', routerLink: 'ratings' }
                                ]
                        },
                        {
                            label: 'Ajout:',
                            items:
                                [
                                    { label: 'Création film', routerLink: 'crudMovies' },
                                    { label: 'Création note', routerLink: 'crudRatings' }
                                ]
                        },
                    ],
                ]
            },
            {
                label: 'Utilisateurs', icon: 'pi pi-fw pi-users',
                items: [
                    [
                        {
                            label: 'BDD:',
                            items: [{ label: 'Tableau clients', routerLink: 'users' },]
                        },
                        {
                            label: 'Ajout:',
                            items: [{ label: 'Création clients', routerLink: 'crudUsers' },]
                        },
                    ],
                ]
            },
            {
                label: 'Categories', icon: 'pi pi-fw pi-book',
                items: [
                    [
                        {
                            label: 'BDD:',
                            items: [{ label: 'Tableau catégories', routerLink: 'categories' },]
                        },
                        {
                            label: 'Ajout:',
                            items: [{ label: 'Création catégorie', routerLink: 'crudCategories' },]
                        },
                    ],
                ]
            },
        ]
    }
}


