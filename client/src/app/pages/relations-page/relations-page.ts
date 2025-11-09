import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import { DragAndDropComponent, Choice, DropZone } from '../../shared/drag-and-drop/drag-and-drop';

@Component({
  selector: 'app-relations-page',
  standalone: true,
  imports: [CommonModule, AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, TabsModule, QuizComponent, DragAndDropComponent],
  templateUrl: './relations-page.html',
  styleUrls: ['./relations-page.css']
})
export class RelationsPage implements AfterViewInit {
  private route = inject(ActivatedRoute);

  // Reference to the accordion element in the template
  @ViewChild('accordion') accordion!: ElementRef;

  // Stores currently open accordion panels
  activeTabs: string[] = [];
  activeTab = '0';
  // Tracks whether all panels are expanded or collapsed
  isExpanded = false;
  // Holds the specific panel to open (from URL query params)
  panelToOpen: string | null = null;

  // Drag and Drop Choices for relations-page
  relationChoices: Choice[] = [
    { id: 1, name: 'Reflexive' },
    { id: 2, name: 'Symmetric' },
    { id: 3, name: 'Transitive' },
    { id: 4, name: 'Antisymmetric' }
  ];

  // Correct answers for each drop zone
  relationDropZones: DropZone[] = [
    { label: 'R = {(1,1), (2,2), (3,3), (1,2)}', correctAnswerID:1}, //reflexive
    { label: 'R = {(1,2), (2,1), (2,3), (3,2)}', correctAnswerID:2}, //symmetric
    { label: 'R = {(1,2), (2,3), (1,3), (3,3)}', correctAnswerID:3}, //transitive
    { label: 'R = {(1,1), (2,2), (1,2)}', correctAnswerID:4}, //antisymmetric
  ];

  /* Quiz questions and answers */
  relationQuestions = [
    {
      text: 'Let A = {a, b} and B = {1, 2}. Which of the following is a valid relation from A to B?',
      options: [
        '{(a, 1), (b, 2)}',
        '{(1, a), (2, b)}',
        '{(a, b), (1, 2)}',
        '{a, 1}'
      ],
      correct: '{(a, 1), (b, 2)}',
      explanation:
        'A relation from A to B must be a set of ordered pairs (x, y) where x ∈ A and y ∈ B. Only {(a, 1), (b, 2)} satisfies this.'
    },
    {
      text: 'If set A has 3 elements and set B has 4 elements, how many ordered pairs are in the Cartesian product A × B?',
      options: ['3', '4', '7', '12'],
      correct: '12',
      explanation:
        'The number of elements in A × B is |A| × |B|, which equals 3 × 4 = 12.'
    }
  ];

  //Handler for drag and drop changes
  handleChoicesChanged(event: { available: Choice[], zone1: Choice[], zone2: Choice[], zone3: Choice[], zone4: Choice[] }) {
  console.log('Available choices:', event.available);
  console.log('Zone 1:', event.zone1);
  console.log('Zone 2:', event.zone2);
  console.log('Zone 3:', event.zone3);
  console.log('Zone 4:', event.zone4);
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
    // If you add more panels, update this range accordingly or compute dynamically from the template data.
    this.activeTabs = ['0', '1', '2', '3', '4', '5', '6'];
    this.isExpanded = true;
  }

  collapseAll() {
    this.activeTabs = [];
    this.isExpanded = false;
  }

  // Toggle a single panel open/closed
  togglePanel(panelValue: string) {
    const idx = this.activeTabs.indexOf(panelValue);
    if (idx > -1) {
      this.activeTabs.splice(idx, 1);
    } else {
      this.activeTabs.push(panelValue);
      // scroll opened panel into view
      setTimeout(() => {
        const panelEl = document.querySelector(`p-accordion-panel[value="${panelValue}"]`);
        panelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    this.isExpanded = this.activeTabs.length > 0;
  }

  // Opens a specific panel and scrolls it into view
  openPanel(panelValue: string) {
    if (!this.activeTabs.includes(panelValue)) {
      this.activeTabs.push(panelValue);
    }

    // Smoothly scroll the opened panel into view
    setTimeout(() => {
      const panelEl = document.querySelector(`p-accordion-panel[value="${panelValue}"]`);
      panelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

    // Lifecycle- read query params and open target panel (if provided)
  ngAfterViewInit(): void {
    // subscribe to queryParamMap to capture ?panel= value
    this.route.queryParamMap.subscribe(params => {
      const panel = params.get('panel');
      if (panel) {
        // store and open after view init
        this.panelToOpen = panel;
        // ensure change detection has run / accordion rendered
        setTimeout(() => this.openPanel(panel), 50);
      }
    });
  }

}
