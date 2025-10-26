import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink} from '@angular/router';

@Component({
    selector: 'app-menubar',
    templateUrl: './menubar.html',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterLink]
})
export class AppMenubar implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Home', routerLink: '/home' },
            { label: 'Logic', routerLink: '/logic' },
            { label: 'Basic Structures', routerLink: '/basic-structures' },
            { label: 'Relations', routerLink: '/relations',
                items: [
                    {label: 'Relations Introduction', routerLink: '/relations', panelValue: '0'},
                    {label: 'Relations and their Properties', routerLink: '/relations', panelValue: '1'},
                    {label: 'Representing Relations Using Matrices', routerLink: '/relations', panelValue: '2'},
                    {label: 'Operations on Relations', routerLink: '/relations', panelValue: '3'},
                    {label: 'Equivalence Relations', routerLink: '/relations', panelValue: '4'}
                ]
             },
            { label: 'Graph Theory', routerLink: '/graph-theory' },
            { label: 'Counting', routerLink: '/counting' },
            { label: 'Number Theory & Cryptography', routerLink: '/number-theory',
                items: [
                    {label: 'Number Theory Introduction', routerLink: '/number-theory', panelValue: '0'},
                    {label: 'Integers & Divisibility', routerLink: '/number-theory', panelValue: '1'},
                    {label: 'GCD & LCM', routerLink: '/number-theory', panelValue: '2'},
                    {label: 'Prime Numbers', routerLink: '/number-theory', panelValue: '3'},
                    {label: 'Modular Arithmetic', routerLink: '/number-theory', panelValue: '4'},
                    {label: 'Classical Theorems', routerLink: '/number-theory', panelValue: '5'},
                    {label: 'Applications in Cryptography and Computer Science', routerLink: '/number-theory', panelValue: '6'}
                ]
             },
            { icon: PrimeIcons.BITCOIN, label: "n Bitcoin"}
        
        ];
    }
}
