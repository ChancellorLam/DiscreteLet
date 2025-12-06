import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import { LatexContainer } from '../../shared/components/latex-container/latex-container';
import { LogicalExpressionService } from '../../core/services/logical-expression-service';
import { TruthTable } from './truth-table/truth-table';
import { TruthTableSolver } from './truth-table-solver/truth-table-solver';
import {UnitTestConfig, UnitTestTemplate} from '../../shared/unit-test-template/unit-test-template';

// interface for quiz question
interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation?: string;
}

@Component({
  selector: 'app-logic-page',
  imports: [
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    TabsModule,
    QuizComponent,
    LatexContainer,
    TruthTable,
    TruthTableSolver,
    UnitTestTemplate,
  ],
  templateUrl: './logic-page.html',
  styleUrl: './logic-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogicPage {
  logicalExpressionService = inject(LogicalExpressionService);

  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;

  public getSubexpressions(expression: string) {
    return this.logicalExpressionService.generateTruthTable(expression).subexpressions;
  }

  public getTruthTable(expression: string) {
    return this.logicalExpressionService.generateTruthTable(expression).table ;
  }

  /* Quiz questions and answers */
  logicQuestionPool: Question[] = [
    {
      text: 'What does the symbol ¬ represent in logic?',
      options: [
        'AND (Conjunction)',
        'OR (Disjunction)',
        'NOT (Negation)',
        'IF AND ONLY IF (Biconditional)'
      ],
      correct: 'NOT (Negation)',
      explanation: '¬ is the negation operator; it inverts the truth value of a proposition.'
    },
    {
      text: 'What does the symbol ∧ represent in logic?',
      options: [
        'AND (Conjunction)',
        'OR (Disjunction)',
        'NOT (Negation)',
        'Implication (IF, THEN)'
      ],
      correct: 'AND (Conjunction)',
      explanation: '∧ is the logical AND operator; the statement is true only if both propositions are true.'
    },
    {
      text: 'What does the symbol ∨ represent in logic?',
      options: [
        'AND (Conjunction)',
        'OR (Disjunction)',
        'NOT (Negation)',
        'Biconditional (IF AND ONLY IF)'
      ],
      correct: 'OR (Disjunction)',
      explanation: '∨ is the logical OR operator; the statement is true if at least one proposition is true.'
    },
    {
      text: 'What does the symbol → represent in logic?',
      options: [
        'AND (Conjunction)',
        'OR (Disjunction)',
        'NOT (Negation)',
        'IF, THEN (Implication)'
      ],
      correct: 'IF, THEN (Implication)',
      explanation: '→ represents a conditional statement: if the antecedent is true, the consequent must also be true.'
    },
    {
      text: 'What does the symbol ↔ represent in logic?',
      options: [
        'AND (Conjunction)',
        'OR (Disjunction)',
        'Biconditional (IF AND ONLY IF)',
        'Implication (IF, THEN)'
      ],
      correct: 'Biconditional (IF AND ONLY IF)',
      explanation: '↔ is true only if both the implication and its converse are true.'
    },
    {
      text: 'Which logical rule allows you to deduce Q from P → Q and P?',
      options: [
        'Modus Ponens',
        'Contrapositive',
        'Converse',
        'Disjunction Introduction'
      ],
      correct: 'Modus Ponens',
      explanation: 'Modus Ponens states that if P → Q is true and P is true, then Q must also be true.'
    },
    {
      text: 'If P → Q is true, which of the following is also guaranteed to be true?',
      options: [
        'Q → P',
        '¬Q → ¬P (Contrapositive)',
        'P ∧ Q',
        'P ∨ Q'
      ],
      correct: '¬Q → ¬P (Contrapositive)',
      explanation: 'The contrapositive of an implication is logically equivalent to the original statement.'
    },
    {
      text: 'Which of the following is NOT guaranteed by P → Q being true?',
      options: [
        '¬Q → ¬P',
        'Q → P',
        'If P is true, Q is true',
        'The implication can be false if P is true and Q is false'
      ],
      correct: 'Q → P',
      explanation: 'The converse of an implication (Q → P) is not necessarily true.'
    },
    {
      text: 'What is a truth table used for?',
      options: [
        'Solving equations',
        'Listing all possible outcomes of logical statements',
        'Finding derivatives',
        'Generating random numbers'
      ],
      correct: 'Listing all possible outcomes of logical statements',
      explanation: 'Truth tables show whether a statement is true or false for every combination of input values.'
    },
    {
      text: 'A biconditional statement P ↔ Q is true when:',
      options: [
        'Only P is true',
        'Only Q is true',
        'Both P → Q and Q → P are true',
        'Either P or Q is true'
      ],
      correct: 'Both P → Q and Q → P are true',
      explanation: 'A biconditional is true when the implication and its converse are both true.'
    }
  ];

  logicUnitTestConfig: UnitTestConfig = {
    title: 'Logic Unit Test',
    description: 'Test your knowledge of logical symbols, truth tables, and implications.',
    passingScore: 70,
    timeLimit: 30,
    questions: [
      // Easy Questions (5 total)
      {
        question: 'What does the symbol ¬ represent in logic?',
        options: ['AND (Conjunction)', 'OR (Disjunction)', 'NOT (Negation)', 'IF AND ONLY IF (Biconditional)'],
        correctAnswer: 2,
        explanation: '¬ is the negation operator; it inverts the truth value of a proposition.',
        difficulty: 'easy'
      },
      {
        question: 'What does the symbol ∧ represent in logic?',
        options: ['AND (Conjunction)', 'OR (Disjunction)', 'NOT (Negation)', 'Implication (IF, THEN)'],
        correctAnswer: 0,
        explanation: '∧ is the logical AND operator; the statement is true only if both propositions are true.',
        difficulty: 'easy'
      },
      {
        question: 'What does the symbol ∨ represent in logic?',
        options: ['AND (Conjunction)', 'OR (Disjunction)', 'NOT (Negation)', 'Biconditional (IF AND ONLY IF)'],
        correctAnswer: 1,
        explanation: '∨ is the logical OR operator; the statement is true if at least one proposition is true.',
        difficulty: 'easy'
      },
      {
        question: 'What does the symbol → represent in logic?',
        options: ['AND (Conjunction)', 'OR (Disjunction)', 'NOT (Negation)', 'IF, THEN (Implication)'],
        correctAnswer: 3,
        explanation: '→ represents a conditional statement: if the antecedent is true, the consequent must also be true.',
        difficulty: 'easy'
      },
      {
        question: 'What does the symbol ↔ represent in logic?',
        options: ['AND (Conjunction)', 'OR (Disjunction)', 'Biconditional (IF AND ONLY IF)', 'Implication (IF, THEN)'],
        correctAnswer: 2,
        explanation: '↔ is true only if both the implication and its converse are true.',
        difficulty: 'easy'
      },

      // Hard Questions (5 total)
      {
        question: 'Which logical rule allows you to deduce Q from P → Q and P?',
        options: ['Modus Ponens', 'Contrapositive', 'Converse', 'Disjunction Introduction'],
        correctAnswer: 0,
        explanation: 'Modus Ponens states that if P → Q is true and P is true, then Q must also be true.',
        difficulty: 'hard'
      },
      {
        question: 'If P → Q is true, which of the following is also guaranteed to be true?',
        options: ['Q → P', '¬Q → ¬P (Contrapositive)', 'P ∧ Q', 'P ∨ Q'],
        correctAnswer: 1,
        explanation: 'The contrapositive of an implication is logically equivalent to the original statement.',
        difficulty: 'hard'
      },
      {
        question: 'Which of the following is NOT guaranteed by P → Q being true?',
        options: ['¬Q → ¬P', 'Q → P', 'If P is true, Q is true', 'The implication can be false if P is true and Q is false'],
        correctAnswer: 1,
        explanation: 'The converse of an implication (Q → P) is not necessarily true.',
        difficulty: 'hard'
      },
      {
        question: 'What is a truth table used for?',
        options: ['Solving equations', 'Listing all possible outcomes of logical statements', 'Finding derivatives', 'Generating random numbers'],
        correctAnswer: 1,
        explanation: 'Truth tables show whether a statement is true or false for every combination of input values.',
        difficulty: 'hard'
      },
      {
        question: 'A biconditional statement P ↔ Q is true when:',
        options: ['Only P is true', 'Only Q is true', 'Both P → Q and Q → P are true', 'Either P or Q is true'],
        correctAnswer: 2,
        explanation: 'A biconditional is true when the implication and its converse are both true.',
        difficulty: 'hard'
      }
    ]
  };

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
