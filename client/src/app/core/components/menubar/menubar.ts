import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RewardService } from '../../services/reward-service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgOptimizedImage
  ]
})
export class AppMenubar implements OnInit {
    items: MenuItem[] = [];
    public rewards = inject(RewardService);

    // Initialization — build menubar structure
    ngOnInit() {
        // Define navigation menu items and submenus
        this.items = [
            { label: 'Home', routerLink: '/home' },
            { label: 'Logic', routerLink: '/logic' },
            { label: 'Basic Structures', routerLink: '/basic-structures' },
            { label: 'Relations', routerLink: '/relations'},
            { label: 'Graph Theory', routerLink: '/graph-theory' },
            { label: 'Counting', routerLink: '/counting' },
            { label: 'Number Theory & Cryptography', routerLink: '/number-theory'},
            { icon: PrimeIcons.BITCOIN}
        ];
    }
}
