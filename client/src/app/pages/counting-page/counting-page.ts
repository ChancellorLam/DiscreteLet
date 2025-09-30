import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-counting-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule],
  templateUrl: './counting-page.html',
  styleUrl: './counting-page.css'
})
export class CountingPage {

  activeTabs: string[] = [];
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
