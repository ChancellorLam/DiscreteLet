import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RewardService } from '../../services/reward-service';

@Component({
    selector: 'app-menubar',        // Component selector for use in templates
    templateUrl: './menubar.html',      // Linked HTML template
    styleUrl: './menubar.css',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterLink, FormsModule]
})
export class AppMenubar implements OnInit {
    items: MenuItem[] = [];
    public rewards = inject(RewardService);

    private router = inject(Router);        // Angular router instance (using inject API)

    // Initialization — build menubar structure
    ngOnInit() {

        // Debug logs to confirm PrimeIcons loading correctly
        console.log("PrimeIcons object: ", PrimeIcons);
        console.log("PrimeIcons.Bitcoin:", PrimeIcons.BITCOIN);

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
        console.log(PrimeIcons.BITCOIN);
    }



    // Expands a specific accordion panel by its 'value' attribute
    openPanel(panelValue: string | number){
        const accordion = document.querySelector('p-accordion');
        if(!accordion) return;

        // Find the target panel matching the provided value
        const panel = Array.from(accordion.querySelectorAll('p-accordion-panel'))
        .find(p => p.getAttribute('value') === String(panelValue));

        // Click to open if not already active
        if(panel) {
            const header = panel.querySelector('p-accordion-header') as HTMLElement;
            if(header && !panel.classList.contains('p-accordion-header-active')) {
                header.click();
            }
            // Smoothly scroll to the opened panel
            setTimeout(() => {
                panel.scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 150);
        }
    }

}
