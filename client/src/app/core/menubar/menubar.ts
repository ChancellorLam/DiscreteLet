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
    selector: 'app-menubar',        // Component selector for use in templates
    templateUrl: './menubar.html',      // Linked HTML template
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterLink, FormsModule]
}) 
export class AppMenubar implements OnInit {
    items: MenuItem[] = [];     // Holds all menu items displayed in the menubar
    searchQuery = '';       // Bound to the search input field in the template

    private router = inject(Router);        // Angular router instance (using inject API)

    // Initialization — build menubar structure
    ngOnInit() {

        // Debug logs to confirm PrimeIcons loading correctly
        console.log("PrimeIcons object: ", PrimeIcons);
        console.log("PrimeIcons.Bitcoin:", PrimeIcons.BITCOIN);

        // Define navigation menu items and submenus
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
            { label: '', icon: PrimeIcons.BITCOIN}
        
        ];
        console.log(PrimeIcons.BITCOIN);
    }
    
    // SEARCH FUNCTIONALITY
    // Searches the menu items (and nested items) for a label that matches user input
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
            // If a matching menu item is found, navigate to it
            if (match && match.routerLink) {
                // If item has a panelValue, pass it as query param
                const queryParams = match['panelValue'] != null ? { panel: match['panelValue'] } : {};
                this.router.navigate([match.routerLink], { queryParams });
                this.searchQuery = '';
        }   else {
                alert('Topic not found.');
            }

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