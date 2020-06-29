import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Hospitais',  icon: 'pe-7s-home', class: '' },
    { path: '/sector', title: 'Setores',  icon: 'pe-7s-portfolio', class: '' },
    { path: '/employee', title: 'Funcionários',  icon: 'pe-7s-id', class: '' },
    { path: '/hospitalization', title: 'Internações',  icon: 'pe-7s-note2', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
