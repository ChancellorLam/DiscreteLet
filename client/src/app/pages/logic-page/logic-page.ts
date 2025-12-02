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

/* Quiz questions and answers */
  logicQuestions = [
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

  public getSubexpressions(expression: string) {
    return this.logicalExpressionService.generateTruthTable(expression).subexpressions;
  }

  public getTruthTable(expression: string) {
    return this.logicalExpressionService.generateTruthTable(expression).table ;
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
