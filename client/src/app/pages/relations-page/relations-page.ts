import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relations-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule],
  templateUrl: './relations-page.html',
  styleUrl: './relations-page.css'
})
export class RelationsPage implements AfterViewInit {
  // Reference to the accordion element in the template
  @ViewChild('accordion') accordion!: ElementRef;

  // Stores currently open accordion panels
  activeTabs: string[] = [];
  // Tracks whether all panels are expanded or collapsed
  isExpanded = false;
  // Holds the specific panel to open (from URL query params)
  panelToOpen: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    // Retrieve "panel" query parameter to determine which panel to open on load
    this.route.queryParams.subscribe(params => {
      this.panelToOpen = params['panel'] ?? null;
    });
  }

  ngAfterViewInit() {
    // If a panel is specified in the URL, open it after the view initializes
    if (this.panelToOpen) {
      setTimeout(() => this.openPanel(this.panelToOpen!), 200);
    }
  }

  // Toggles between expanding all and collapsing all panels
  toggleAll() {
    if (this.isExpanded) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
    this.isExpanded = !this.isExpanded;
  }

  expandAll() {
    this.activeTabs = ['0', '1', '2', '3', '4', '5', '6'];
  }

  collapseAll() {
    this.activeTabs = [];
  }

  // Opens a specific panel and scrolls it into view
openPanel(panelValue: string) {
  // Add the panel to the list if it's not already open
    if (!this.activeTabs.includes(panelValue)) {
      this.activeTabs.push(panelValue);
    }

    // Smoothly scroll the opened panel into view
    setTimeout(() => {
      const panelEl = document.querySelector(`p-accordion-panel[value="${panelValue}"]`);
      panelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

}
