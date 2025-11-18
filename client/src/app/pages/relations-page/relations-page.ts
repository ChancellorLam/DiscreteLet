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

// stucture for drag-drop results
interface DragDropResult {
  correctness: boolean[];
  zones: {
    zone1: Choice[];
    zone2: Choice[];
    zone3: Choice[];
    zone4: Choice[];
  };
}

//structure for quiz questions
interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation: string;
}

@Component({
  selector: 'app-relations-page',
  standalone: true,
  imports: [CommonModule, AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, TabsModule, QuizComponent, DragAndDropComponent],
  templateUrl: './relations-page.html',
  styleUrls: ['./relations-page.css']
})
export class RelationsPage implements AfterViewInit {
  //inject ActivatedRoute service to read URL query parameters
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

  // Feedback messages shown below drag-drop 
feedbackMessages: string[] = [];

// Handler for drag-drop correctness event 
handleResults(result: DragDropResult) {
    const feedbackTexts = [
        "Every element in this set is related to itself, therefore it is Reflexive.",
        "For every pair in R, the reversed pair is also in R. Therefore, this is Symmetric.",
        "If a is related to b and b is related to c, then a is related to c. Therefore, this is Transitive.",
        "For every pair (a,b) in R, (b,a) is not in R. Therefore, this is Antisymmetric."
    ];

    //labels corresponding to each drop zone
    const labels = ["Reflexive", "Symmetric", "Transitive", "Antisymmetric"];

    //generate feedback message for each zone based on correctness
    this.feedbackMessages = result.correctness.map((isCorrect, i) =>
        isCorrect
            ? `${labels[i]}: Correct! ${feedbackTexts[i]}`
            : `${labels[i]}: Incorrect. ${feedbackTexts[i]}`
    );
}

  // Correct answers for each drop zone
  relationDropZones: DropZone[] = [
    { label: 'R = {(1,1), (2,2), (3,3), (1,2)}', correctAnswerID:1}, //reflexive
    { label: 'R = {(1,2), (2,1), (2,3), (3,2)}', correctAnswerID:2}, //symmetric
    { label: 'R = {(1,2), (2,3), (1,3), (3,3)}', correctAnswerID:3}, //transitive
    { label: 'R = {(1,1), (2,2), (1,2)}', correctAnswerID:4}, //antisymmetric
  ];

  /* Quiz questions and answers */
  relationQuestionPool: Question[] = [
    {
      text: 'Let A = {a, b} and B = {1, 2}. Which of the following is a valid relation from A to B?',
      options: ['{(a, 1), (b, 2)}', '{(1, a), (2, b)}', '{(a, b), (1, 2)}', '{a, 1}'],
      correct: '{(a, 1), (b, 2)}',
      explanation:
        'A relation from A to B must be a set of ordered pairs (x, y) where x ∈ A and y ∈ B. Only {(a, 1), (b, 2)} satisfies this.'
    },
    {
      text: 'Let R = {(1, 1), (2, 2), (1, 2), (2, 1)} be a relation on the set A = {1, 2}. Which property is R missing?',
      options: ['Reflexive', 'Symmetric', 'Transitive', 'R has all three properties'],
      correct: 'R has all three properties',
      explanation:
        'The relation is reflexive (it has (1, 1) and (2, 2)), symmetric (if (a, b) is there, (b, a) is there), and transitive.'
    },
    {
      text: 'Let A = {1, 2, 3} and R = {(1, 2), (2, 3), (3, 3)}. What is the matrix representation MR?',
      options: ['[ 0 1 0 ] [ 0 0 1 ] [ 0 0 1 ]', '[ 0 1 0 ] [ 0 0 0 ] [ 0 0 1 ]', '[ 1 1 0 ] [ 0 1 1 ] [ 0 0 1 ]', '[ 0 0 0 ] [ 1 0 0 ] [ 0 1 1 ]'],
      correct: '[ 0 1 0 ] [ 0 0 1 ] [ 0 0 1 ]',
      explanation: 'The entry MR[i, j] = 1 if (i, j) is in R.'
    },
    {
      text: ' Let R1 = {(1, 2), (2, 3), (3, 1)} and R2 = {(2, 3), (3, 2)}. What is the union R1 U R2?',
      options: ['{(2, 3)}', '{(1, 2), (3, 1), (3, 2)}', '{(1, 2), (2, 3), (3, 1), (3, 2)}', '{(1, 2), (3, 1)}'],
      correct: '{(1, 2), (2, 3), (3, 1), (3, 2)}',
      explanation: 'The union includes all pairs from both sets.'
    },
    {
      text: 'Given M1 = [ 0 1 ] [ 1 0 ]. What is the complement matrix, ¬M1?',
      options: ['[ 1 0 ] [ 0 1 ]', '[ 0 1 ] [ 1 0 ]', '[ 1 1 ] [ 0 0 ]', '[ 0 0 ] [ 1 1 ]'],
      correct: '[ 1 0 ] [ 0 1 ]',
      explanation: 'The complement (Logical NOT) flips 1s to 0s and 0s to 1s.S'
    },
    {
      text: 'Which three properties must a relation have to be an equivalence relation?',
      options: ['Reflexive, Symmetric, Antisymmetric', 'Reflexive, Antisymmetric, Transitive', 'Symmetric, Antisymmetric, Transitive', 'Reflexive, Symmetric, Transitive'],
      correct: 'Reflexive, Symmetric, Transitive',
      explanation: 'An equivalence relation must relate every element to itself (reflexive), have mutual relationships (symmetric), and preserve relationships through chains (transitive).'
    },
    {
      text: 'Which branch of mathematics is most closely related to number theory in its study of arithmetic properties?',
      options: ['Geometry', 'Abstract algebra', 'Calculus', 'Statistics'],
      correct: 'Abstract algebra',
      explanation: 'Number theory overlaps strongly with algebraic structures like rings and fields.'
    },
    {
      text: 'Number theory is primarily concerned with which type of objects?',
      options: ['Real functions', 'Integers', 'Vectors', 'Matrices'],
      correct: 'Integers',
      explanation: 'Integer properties and relationships form the core of number theory.'
    },
    {
      text: 'If a = 42 and b = 7, which is true?',
      options: ['a|b', 'b|a', 'Both divide each other', 'Neither divides the other'],
      correct: 'b|a',
      explanation: 'Since 7 divides 42, b divides a (b|a).'
    },
    {
      text: 'If a = 15 and b = 4, which statement is correct?',
      options: ['a|b', 'b|a', 'Both divide each other', 'Neither divides the other'],
      correct: 'Neither divides the other',
      explanation: 'Neither 15 nor 4 divides the other.'
    },
    {
      text: 'What is the GCD of 84 and 30?',
      options: ['3', '6', '12', '15'],
      correct: '6',
      explanation: 'The Euclidean algorithm gives 6.'
    },
    {
      text: 'What is the LCM of 8 and 12?',
      options: ['12', '16', '24', '48'],
      correct: '24',
      explanation: 'The least common multiple of a and b equals a times b divided by their greatest common divisor, which is 24.'
    }

  ];

  // Displayed questions, randomly selected from pool
  relationQuestions: Question[] = [];

  //constructor runs when component is created
  constructor() {
    // initialize with random questions when component is created
    this.selectRandomQuestions(5);
  }

  //randomly selects n questions from the question pool
  //count num questions to select (default is 5)
  selectRandomQuestions(count = 5): void {
    //create a copy of the pool and shuffle it
    const shuffled = [...this.relationQuestionPool].sort(() => Math.random() -0.5);
    //take the first count questions
    this.relationQuestions = shuffled.slice(0, Math.min(count, this.relationQuestionPool.length));
  }

  //refresh quiz with new random questions
  refreshQuiz(): void {
    this.selectRandomQuestions(5);
  }


  //Handler for drag and drop changes
  //called whenever choices are moved between zones
  handleChoicesChanged(event: { available: Choice[], zone1: Choice[], zone2: Choice[], zone3: Choice[], zone4: Choice[] }) {
    //log the current state of all zones for debuggng
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
  }

  collapseAll() {
    this.activeTabs = [];
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
