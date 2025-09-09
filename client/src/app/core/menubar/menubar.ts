import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  imports: [MenubarModule],
  styleUrl: './menubar.css',
  template: `
    <p-menubar [model]="items"></p-menubar>
  `
})
export class AppMenubar {
  items = [
    { label: 'Home', routerLink: '/' },
    { label: 'Logic', routerLink: '/logic' },
    { label: 'Basic Structures', routerLink: '/basic-structures' },
    { label: 'Relations', routerLink: '/relations' },
    { label: 'Graph Theory', routerLink: '/graph-theory' },
    { label: 'Counting', routerLink: '/counting' },
    { label: 'Number Theory', routerLink: '/number-theory' },
  ];
}
