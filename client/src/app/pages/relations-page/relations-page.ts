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
  @ViewChild('accordion') accordion!: ElementRef;

  activeTabs: string[] = [];
  isExpanded = false;
  panelToOpen: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    //get panelValue from query params
    this.route.queryParams.subscribe(params => {
      this.panelToOpen = params['panel'] ?? null;
    });
  }

  ngAfterViewInit() {
    if (this.panelToOpen) {
      setTimeout(() => this.openPanel(this.panelToOpen!), 200);
    }
  }

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

openPanel(panelValue: string) {
    if (!this.activeTabs.includes(panelValue)) {
      this.activeTabs.push(panelValue);
    }

    setTimeout(() => {
      const panelEl = document.querySelector(`p-accordion-panel[value="${panelValue}"]`);
      panelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

}
