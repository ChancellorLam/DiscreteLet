import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, RouterModule],
  styleUrls: ['./menubar.css'],
  template: `
    <p-menubar [model]="items"></p-menubar>
  `
})
export class AppMenubar {
  items = [
    { label: 'Home', routerLink: '/' },
    { label: 'Logic & Proofs', routerLink: '/logicandproofs' },
    { label: 'Number Theory & Cryptography', routerLink: '/numtheoryxcrypt' },
    { label: 'Graph Theory', routerLink: '/graphtheory' },
    { label: 'Counting', routerLink: '/counting' },
    { label: 'Basic Structures', routerLink: '/basicstructures' },
    { label: 'Relations', routerLink: '/relations' }
  ];
}