// Angular
import { Component } from '@angular/core';
// Primeng
import {MegaMenuItem,MenuItem} from 'primeng/api';

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
              label: 'Movies', icon: 'pi pi-fw pi-video',
              items: [
                  [
                      {
                          label: 'Read',
                          items: [{label: 'List movies', routerLink: 'movies'}]
                      },
                      {
                          label: 'Search',
                          items: [{label: 'Search movie', routerLink: 'searchMovies'}]
                      },
                      {
                          label: 'Crud',
                          items: [{label: 'Crud Movies', routerLink: 'crudMovies'}]
                      },
                  ],
              ]
          },
          {
              label: 'Users', icon: 'pi pi-fw pi-users',
              items: [
                  [
                      {
                          label: 'Read',
                          items: [{label: 'List users', routerLink:'users'},]
                      },
                      {
                          label: 'Search',
                          items: [{label: 'Search user', routerLink:'searchUsers'},]
                      },
                      {
                          label: 'Crud',
                          items: [{label: 'Crud users', routerLink:'crudUsers'},]
                      },
                  ],
              ]
          },
          {
              label: 'Categories', icon: 'pi pi-fw pi-book',
              items: [
                  [
                      {
                          label: 'Read',
                          items: [{label: 'List categories', routerLink:'categories'},]
                      },
                      {
                          label: 'Search',
                          items: [{label: 'Search category', routerLink:'searchCategories'},]
                      },
                      {
                          label: 'Crud',
                          items: [{label: 'Crud category', routerLink:'crudCategories'},]
                      },
                  ],
              ]
          },
          {
              label: 'Settings', icon: 'pi pi-fw pi-cog',
              items: [
                  [
                      {
                          label: 'Setting 1',
                          items: [{label: 'Setting 1.1'}, {label: 'Setting 1.2'}]
                      },
                      {
                          label: 'Setting 2',
                          items: [{label: 'Setting 2.1'}, {label: 'Setting 2.2'}]
                      },
                      {
                          label: 'Setting 3',
                          items: [{label: 'Setting 3.1'}, {label: 'Setting 3.2'}]
                      }
                  ],
                  [
                      {
                          label: 'Technology 4',
                          items: [{label: 'Setting 4.1'}, {label: 'Setting 4.2'}]
                      }
                  ]
              ]
          }
      ]
  }
}


