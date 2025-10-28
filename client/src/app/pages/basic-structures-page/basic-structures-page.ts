import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-structures-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, InputTextModule, CommonModule],
  templateUrl: './basic-structures-page.html',
  styleUrl: './basic-structures-page.css'
})
export class BasicStructuresPage {
  activeTabs: string[] = [];
  isExpanded = false;
  value = '';
  isValid = false;
  parsedSet: string[] = [];

checkSetInput() {
  let input = this.value.trim();
  if (!input) {
    this.isValid = false;
    this.parsedSet = [];
    return;
  } else if (input.startsWith('{') || input.endsWith('}')) {
    input = input.slice(1, -1).trim();
  }
  

  const pattern = /^[A-Za-z0-9]+(\s*,\s*[A-Za-z0-9]+)*$/;

  if (!pattern.test(input)) {
    this.isValid = false;
    this.parsedSet = [];
    return;
  }

  const elements = input
    .split(',')
    .map(e => e.trim())
    .filter(e => e !== '');

    
  const uniqueElements = new Set(elements);
  if (elements.length !== uniqueElements.size) {
    this.isValid = false;
    this.parsedSet = [];
    return;
  }

  this.isValid = true;
  this.parsedSet = Array.from(uniqueElements);
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

}
