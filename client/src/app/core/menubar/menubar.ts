import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-menubar',
    templateUrl: './menubar.html',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterLink, FormsModule]
}) 
export class AppMenubar implements OnInit {
    items: MenuItem[] = [];
    searchQuery = '';

    private router = inject(Router);

    ngOnInit() {

        console.log("PrimeIcons object: ", PrimeIcons);
        console.log("PrimeIcons.Bitcoin:", PrimeIcons.BITCOIN);

        this.items = [
            { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
            { label: 'Logic', routerLink: '/logic', icon: 'pi pi-sliders-h' },
            { label: 'Basic Structures', routerLink: '/basic-structures', icon: 'pi pi-th-large' },
            { label: 'Relations', routerLink: '/relations', icon: 'pi pi-link',
                items: [
                    {label: 'Relations Introduction', routerLink: '/relations', panelValue: '0'},
                    {label: 'Relations and their Properties', routerLink: '/relations', panelValue: '1'},
                    {label: 'Representing Relations Using Matrices', routerLink: '/relations', panelValue: '2'},
                    {label: 'Operations on Relations', routerLink: '/relations', panelValue: '3'},
                    {label: 'Equivalence Relations', routerLink: '/relations', panelValue: '4'}
                ]
             },
            { label: 'Graph Theory', routerLink: '/graph-theory', icon: 'pi pi-share-alt' },
            { label: 'Counting', routerLink: '/counting', icon: 'pi pi-calculator' },
            { label: 'Number Theory & Cryptography', routerLink: '/number-theory', icon: 'pi pi-hash',
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
            { label: 'Bitcoins', icon: PrimeIcons.BITCOIN}
        ];
    }

    search() {
        const query = this.searchQuery.toLowerCase().trim();

        // recursive function to find a menu item by label
        const findItem = (items: MenuItem[]): MenuItem | undefined => {
            for(const item of items){
                if(item.label?.toLowerCase().includes(query)){
                    return item;
                }
                //check nested items, if applicable
                if(item.items){
                    const found = findItem(item.items);
                    if (found) return found;
                }
            }
            return undefined;
        };

        const match = findItem(this.items);

            if (match && match.routerLink) {
            const queryParams = match['panelValue'] != null ? { panel: match['panelValue'] } : {};
            this.router.navigate([match.routerLink], { queryParams });
            this.searchQuery = '';
        } else {
            alert('Topic not found.');
        }

    }


    openPanel(panelValue: string | number){
        const accordion = document.querySelector('p-accordion');
        if(!accordion) return;

        const panel = Array.from(accordion.querySelectorAll('p-accordion-panel'))
        .find(p => p.getAttribute('value') === String(panelValue));

        if(panel) {
            const header = panel.querySelector('p-accordion-header') as HTMLElement;
            if(header && !panel.classList.contains('p-accordion-header-active')) {
                header.click();
            }
            setTimeout(() => {
                panel.scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 150);
        }
    }


}
