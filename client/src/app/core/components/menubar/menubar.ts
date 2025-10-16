import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
            { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
            { label: 'Logic', routerLink: '/logic', icon: 'pi pi-sliders-h' },
            { label: 'Basic Structures', routerLink: '/basic-structures', icon: 'pi pi-th-large' },
            { label: 'Relations', routerLink: '/relations', icon: 'pi pi-link' },
            { label: 'Graph Theory', routerLink: '/graph-theory', icon: 'pi pi-share-alt' },
            { label: 'Counting', routerLink: '/counting', icon: 'pi pi-calculator' },
            { label: 'Number Theory & Cryptography', routerLink: '/number-theory', icon: 'pi pi-hash' }
        ];
    }
}
