import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, RouterModule],
  template: `
    <p-menubar [model]="items"></p-menubar>
  `
})
export class AppMenubar {
  items = [
    { label: 'Logic and Proofs', routerLink: '/logicandproofs' },
    { label: 'Number Theory and Cryptography', routerLink: '/numtheoryxcrypt' },
    { label: 'Graph Theory', routerLink: '/graphtheory' },
    { label: 'Counting', routerLink: '/counting' },
    { label: 'Basic Structures', routerLink: '/basicstructures' },
    { label: 'Relations', routerLink: '/relations' }
  ];
}