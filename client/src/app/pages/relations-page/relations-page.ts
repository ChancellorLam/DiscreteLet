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
import { UnitTestTemplate, UnitTestConfig } from '../../shared/unit-test-template/unit-test-template';
import { RelationMatrix } from '../../shared/relation-matrix/relation-matrix';
import { RelationOps } from '../../shared/relation-ops/relation-ops';
import { EquivChecker } from '../../shared/equiv-checker/equiv-checker';


interface DragDropResult {
  correctness: boolean[];
  zones: {
    zone1: Choice[];
    zone2: Choice[];
    zone3: Choice[];
    zone4: Choice[];
  };
}

// interface for quiz question
interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation?: string;
}

@Component({
  selector: 'app-relations-page',
  standalone: true,
  imports: [CommonModule, AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, TabsModule, QuizComponent, DragAndDropComponent, UnitTestTemplate, 
    RelationMatrix, RelationOps, EquivChecker],
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

    const labels = ["Reflexive", "Symmetric", "Transitive", "Antisymmetric"];

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
    }
  ];

  // Displayed questions, randomly selected from pool
  relationQuestions: Question[] = [];

  // Unit Test Configuration
  relationUnitTestConfig: UnitTestConfig = {
    title: 'Relations Unit Test',
    description: 'Test your knowledge of relations, their properties, and operations',
    passingScore: 70,
    timeLimit: 30,
    questions: [
      // Easy Questions (15 total)
      {
        question: 'Let A = {a, b} and B = {1, 2}. Which of the following is a valid relation from A to B?',
        options: ['{(a, 1), (b, 2)}', '{(1, a), (2, b)}', '{(a, b), (1, 2)}', '{a, 1}'],
        correctAnswer: 0,
        explanation: 'A relation from A to B must be a set of ordered pairs (x, y) where x ∈ A and y ∈ B. Only {(a, 1), (b, 2)} satisfies this.',
        difficulty: 'easy'
      },
      {
        question: 'Which property means every element is related to itself?',
        options: ['Symmetric', 'Reflexive', 'Transitive', 'Antisymmetric'],
        correctAnswer: 1,
        explanation: 'Reflexive means (a, a) ∈ R for all elements a in the set.',
        difficulty: 'easy'
      },
      {
        question: 'If (a, b) ∈ R implies (b, a) ∈ R, what property does R have?',
        options: ['Reflexive', 'Symmetric', 'Transitive', 'Antisymmetric'],
        correctAnswer: 1,
        explanation: 'This is the definition of the symmetric property.',
        difficulty: 'easy'
      },
      {
        question: 'What does R₁ ∪ R₂ represent?',
        options: ['All pairs in both R₁ and R₂', 'All pairs in R₁ or R₂', 'Pairs in R₁ but not R₂', 'Reversed pairs'],
        correctAnswer: 1,
        explanation: 'Union combines all pairs from both relations.',
        difficulty: 'easy'
      },
      {
        question: 'In a relation matrix, what does a 1 at position [i,j] mean?',
        options: ['i is not related to j', 'i equals j', 'i is related to j', 'j is related to i'],
        correctAnswer: 2,
        explanation: 'A 1 indicates the pair (i, j) is in the relation.',
        difficulty: 'easy'
      },
      {
        question: 'Which three properties define an equivalence relation?',
        options: ['Reflexive, Symmetric, Antisymmetric', 'Reflexive, Symmetric, Transitive', 'Symmetric, Antisymmetric, Transitive', 'Reflexive, Antisymmetric, Transitive'],
        correctAnswer: 1,
        explanation: 'An equivalence relation must be reflexive, symmetric, and transitive.',
        difficulty: 'easy'
      },
      {
        question: 'What does R₁ ∩ R₂ represent?',
        options: ['All pairs in R₁ or R₂', 'Pairs in both R₁ and R₂', 'Pairs in R₁ but not R₂', 'Reversed pairs'],
        correctAnswer: 1,
        explanation: 'Intersection contains only the pairs that appear in both relations.',
        difficulty: 'easy'
      },
      {
        question: 'If (a, b) ∈ R and (b, c) ∈ R implies (a, c) ∈ R, what property does R have?',
        options: ['Reflexive', 'Symmetric', 'Transitive', 'Antisymmetric'],
        correctAnswer: 2,
        explanation: 'This is the definition of the transitive property.',
        difficulty: 'easy'
      },
      {
        question: 'What is the inverse of relation R?',
        options: ['All pairs not in R', 'All pairs in R reversed', 'All pairs (a,a) in R', 'Union of all relations'],
        correctAnswer: 1,
        explanation: 'R⁻¹ contains (b, a) for every (a, b) in R.',
        difficulty: 'easy'
      },
      {
        question: 'A relation on set A is a subset of what?',
        options: ['A', 'A × A', 'A ∪ A', 'A ∩ A'],
        correctAnswer: 1,
        explanation: 'A relation on A is a subset of the Cartesian product A × A.',
        difficulty: 'easy'
      },
      {
        question: 'If R = {(1,1), (2,2)}, which property does R definitely have?',
        options: ['Symmetric', 'Reflexive on {1,2}', 'Transitive', 'All of these'],
        correctAnswer: 3,
        explanation: 'R is reflexive on {1,2}, symmetric (no non-diagonal pairs to check), and transitive (vacuously true).',
        difficulty: 'easy'
      },
      {
        question: 'What does the complement of a relation matrix do?',
        options: ['Reverses all pairs', 'Flips 0s to 1s and 1s to 0s', 'Adds diagonal elements', 'Removes all pairs'],
        correctAnswer: 1,
        explanation: 'The complement operation (¬) flips all bits in the matrix.',
        difficulty: 'easy'
      },
      {
        question: 'If R is symmetric, what can we say about its matrix?',
        options: ['All diagonal entries are 1', 'It equals its transpose', 'All entries are 0 or 1', 'It has no 1s'],
        correctAnswer: 1,
        explanation: 'A symmetric relation has a matrix that equals its transpose (mirror across diagonal).',
        difficulty: 'easy'
      },
      {
        question: 'Which operation finds pairs (a,c) where there exists b such that (a,b) ∈ R₁ and (b,c) ∈ R₂?',
        options: ['Union', 'Intersection', 'Composition', 'Complement'],
        correctAnswer: 2,
        explanation: 'This describes composition R₁ ∘ R₂.',
        difficulty: 'easy'
      },
      {
        question: 'What is R₁ - R₂?',
        options: ['Pairs in R₁ or R₂', 'Pairs in both R₁ and R₂', 'Pairs in R₁ but not in R₂', 'Pairs in R₂ but not in R₁'],
        correctAnswer: 2,
        explanation: 'Set difference R₁ - R₂ contains elements in R₁ that are not in R₂.',
        difficulty: 'easy'
      },
     
      // Hard Questions (15 total)
      {
        question: 'Let R = {(1, 1), (2, 2), (1, 2), (2, 1)} be a relation on A = {1, 2}. Which properties does R have?',
        options: ['Reflexive only', 'Symmetric only', 'Reflexive and Symmetric only', 'Reflexive, Symmetric, and Transitive'],
        correctAnswer: 3,
        explanation: 'R is reflexive (has (1,1) and (2,2)), symmetric (if (a,b) then (b,a)), and transitive (all implications hold).',
        difficulty: 'hard'
      },
      {
        question: 'Given R₁ = {(1, 2), (2, 3)} and R₂ = {(2, 3), (3, 1)}, what is R₁ ∘ R₂ (composition)?',
        options: ['{(1, 3), (2, 1)}', '{(1, 2), (2, 3), (3, 1)}', '{(2, 3)}', '{(1, 1), (2, 2)}'],
        correctAnswer: 0,
        explanation: 'Composition R₁ ∘ R₂ finds pairs (a, c) where ∃b: (a, b) ∈ R₁ and (b, c) ∈ R₂. (1, 2) ∈ R₁ and (2, 3) ∈ R₂ gives (1, 3). (2, 3) ∈ R₁ and (3, 1) ∈ R₂ gives (2, 1).',
        difficulty: 'hard'
      },
      {
        question: 'Let A = {1, 2, 3} and R = {(1, 2), (2, 3), (3, 3)}. What is the matrix representation M_R?',
        options: ['[ 0 1 0 ] [ 0 0 1 ] [ 0 0 1 ]', '[ 0 1 0 ] [ 0 0 0 ] [ 0 0 1 ]', '[ 1 1 0 ] [ 0 1 1 ] [ 0 0 1 ]', '[ 0 0 0 ] [ 1 0 0 ] [ 0 1 1 ]'],
        correctAnswer: 0,
        explanation: 'The entry M_R[i, j] = 1 if (i, j) is in R. Row 1: (1,2) gives [0,1,0]. Row 2: (2,3) gives [0,0,1]. Row 3: (3,3) gives [0,0,1].',
        difficulty: 'hard'
      },
      {
        question: 'If M = [ 0 1 ] [ 1 0 ], what is the complement matrix ¬M?',
        options: ['[ 1 0 ] [ 0 1 ]', '[ 0 1 ] [ 1 0 ]', '[ 1 1 ] [ 0 0 ]', '[ 0 0 ] [ 1 1 ]'],
        correctAnswer: 0,
        explanation: 'The complement flips all bits: 0→1 and 1→0.',
        difficulty: 'hard'
      },
      {
        question: 'On the set {1, 2, 3, 4}, let R = {(1,1), (2,2), (3,3), (4,4), (1,2), (2,1)}. Is R an equivalence relation?',
        options: ['Yes', 'No - not reflexive', 'No - not symmetric', 'No - not transitive'],
        correctAnswer: 0,
        explanation: 'R is reflexive (all (a,a) present), symmetric ((1,2) and (2,1) both present), and transitive (all implications hold). Therefore R is an equivalence relation.',
        difficulty: 'hard'
      },
      {
        question: 'Which operation reverses all pairs in a relation?',
        options: ['Complement', 'Inverse', 'Union', 'Intersection'],
        correctAnswer: 1,
        explanation: 'The inverse operation R⁻¹ reverses each pair: (a,b) becomes (b,a).',
        difficulty: 'hard'
      },
      {
        question: 'Let R₁ = {(1,2), (2,3), (3,1)} and R₂ = {(2,3), (3,2)}. What is R₁ ∪ R₂?',
        options: ['{(2, 3)}', '{(1, 2), (3, 1), (3, 2)}', '{(1, 2), (2, 3), (3, 1), (3, 2)}', '{(1, 2), (3, 1)}'],
        correctAnswer: 2,
        explanation: 'The union includes all pairs from both sets.',
        difficulty: 'hard'
      },
      {
        question: 'Given M₁ = [ 0 1 ] [ 1 0 ] and M₂ = [ 1 0 ] [ 0 1 ], what is M₁ ∧ M₂ (logical AND)?',
        options: ['[ 0 0 ] [ 0 0 ]', '[ 1 1 ] [ 1 1 ]', '[ 0 1 ] [ 1 0 ]', '[ 1 0 ] [ 0 1 ]'],
        correctAnswer: 0,
        explanation: 'Logical AND means both must be 1. Since M₁[1,1]=0 and M₂[1,1]=1, result is 0. Similarly for all positions.',
        difficulty: 'hard'
      },
      {
        question: 'If a relation R is both symmetric and antisymmetric, what must be true?',
        options: ['R must be empty', 'R can only contain pairs (a,a)', 'R must be reflexive', 'R contains all possible pairs'],
        correctAnswer: 1,
        explanation: 'If R is both symmetric and antisymmetric, for any (a,b) in R with a≠b, both (a,b) and (b,a) must be in R (symmetric), but then a must equal b (antisymmetric). So only diagonal pairs (a,a) are allowed.',
        difficulty: 'hard'
      },
      {
        question: 'Let R be a relation on {1,2,3} where R = {(1,2), (2,1), (2,3), (3,2), (1,3), (3,1)}. Is R transitive?',
        options: ['Yes', 'No - (1,2) and (2,3) are in R but (1,3) is missing', 'No - (2,3) and (3,1) are in R but (2,1) is missing', 'No - multiple violations'],
        correctAnswer: 0,
        explanation: 'Check all cases: (1,2)∧(2,3)→(1,3)✓, (1,2)∧(2,1)→(1,1) not required, (2,1)∧(1,3)→(2,3)✓, etc. All requirements are met.',
        difficulty: 'hard'
      },
      {
        question: 'Given the matrix M = [ 1 0 1 ] [ 0 1 0 ] [ 1 0 1 ], is the relation reflexive?',
        options: ['Yes', 'No', 'Cannot determine', 'Only on subset {1,2}'],
        correctAnswer: 0,
        explanation: 'A relation is reflexive if all diagonal entries are 1. M[1,1]=1, M[2,2]=1, M[3,3]=1, so yes.',
        difficulty: 'hard'
      },
      {
        question: 'What is the transitive closure of R = {(1,2), (2,3)}?',
        options: ['{(1,2), (2,3)}', '{(1,2), (2,3), (1,3)}', '{(1,2), (2,3), (3,1)}', '{(1,1), (2,2), (3,3), (1,2), (2,3), (1,3)}'],
        correctAnswer: 1,
        explanation: 'The transitive closure adds all pairs needed to make the relation transitive. Since (1,2) and (2,3) are in R, we must add (1,3).',
        difficulty: 'hard'
      },
      {
        question: 'If R₁ = {(a,b), (b,c)} and R₂ = {(b,a), (c,b)}, what is R₁ ∘ R₂?',
        options: ['{(a,a), (b,b)}', '{(a,b), (b,c)}', '{(b,a), (c,b)}', '{(a,c), (b,a)}'],
        correctAnswer: 0,
        explanation: 'R₁ ∘ R₂ finds (x,z) where ∃y: (x,y)∈R₁ and (y,z)∈R₂. (a,b)∈R₁ and (b,a)∈R₂ gives (a,a). (b,c)∈R₁ and (c,b)∈R₂ gives (b,b).',
        difficulty: 'hard'
      },
      {
        question: 'A relation R is antisymmetric if:',
        options: ['(a,b) ∈ R implies (b,a) ∉ R for all a≠b', '(a,b) ∈ R and (b,a) ∈ R implies a=b', '(a,b) ∈ R implies (b,a) ∈ R', 'No pairs (a,b) exist in R'],
        correctAnswer: 1,
        explanation: 'Antisymmetric means if both (a,b) and (b,a) are in R, then a must equal b. It does not forbid (a,b) and (b,a) when a=b.',
        difficulty: 'hard'
      },
      {
        question: 'Let R be the "divides" relation on {2, 4, 8}. Which pairs are in R?',
        options: ['{(2,4), (2,8), (4,8)}', '{(2,2), (4,4), (8,8), (2,4), (2,8), (4,8)}', '{(4,2), (8,2), (8,4)}', '{(2,4), (4,8)}'],
        correctAnswer: 1,
        explanation: 'The "divides" relation includes all pairs (a,b) where a divides b. This includes reflexive pairs (a divides itself) and: 2|4, 2|8, 4|8.',
        difficulty: 'hard'
      }
    ]
  };



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
  handleChoicesChanged(event: { available: Choice[], zone1: Choice[], zone2: Choice[], zone3: Choice[], zone4: Choice[] }) {
  console.log('Available choices:', event.available);
  console.log('Zone 1:', event.zone1);
  console.log('Zone 2:', event.zone2);
  console.log('Zone 3:', event.zone3);
  console.log('Zone 4:', event.zone4);
}

// ACCORDION CONTROL
// Toggles between expanding and collapsing all panels
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
