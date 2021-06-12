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
                      
                  ],
              ]
          }
      ]
  }
}


