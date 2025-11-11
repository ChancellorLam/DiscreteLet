import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';

@Component({
  selector: 'app-basic-structures-page',
  imports: [
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    TabsModule,
    QuizComponent
  ],
  templateUrl: './basic-structures-page.html',
  styleUrl: './basic-structures-page.css'
})
export class BasicStructuresPage {
  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;

  value1 = '';
  isValid1: boolean | null = null;
  parsedSet1: string[] = [];

  value2 = '';
  isValid2: boolean | null = null;
  parsedSet2: string[] = [];

  checkSetInput(which: 'value1' | 'value2') {
    const valueKey = which;
    const validKey = which === 'value1' ? 'isValid1' : 'isValid2';
    const parsedKey = which === 'value1' ? 'parsedSet1' : 'parsedSet2';

    let input = this[valueKey].trim();

    if (!input) {
      this[validKey] = null;
      this[parsedKey] = [];
      return;
    }

    if (input.startsWith('{') && input.endsWith('}')) {
      input = input.slice(1, -1).trim();
    }

    const pattern = /^[A-Za-z0-9]+(\s*,\s*[A-Za-z0-9]+)*$/;

    if (!pattern.test(input)) {
      this[validKey] = false;
      this[parsedKey] = [];
      return;
    }

    const elements = input
      .split(',')
      .map(e => e.trim())
      .filter(e => e !== '');

    const uniqueElements = new Set(elements);

    if (elements.length !== uniqueElements.size) {
      this[validKey] = false;
      this[parsedKey] = [];
      return;
    }

    this[validKey] = true;
    this[parsedKey] = Array.from(uniqueElements);
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
