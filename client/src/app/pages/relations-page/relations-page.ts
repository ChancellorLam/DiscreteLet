import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-relations-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, TabsModule],
  templateUrl: './relations-page.html',
  styleUrl: './relations-page.css'
})
export class RelationsPage {

  activeTabs: string[] = [];
  activeTab = '0';
  // Tracks whether all panels are expanded or collapsed
  isExpanded = false;

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
}
