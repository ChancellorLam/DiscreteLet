import { Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import confetti from 'canvas-confetti';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { RewardService } from '../../core/services/reward-service';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import { TestButton } from './test-button/test-button/test-button';

@Component({
  selector: 'app-counting-page',
  imports: [
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    TabsModule,
    QuizComponent
  ],
  templateUrl: './counting-page.html',
  styleUrl: './counting-page.css'
})
export class CountingPage {
  private rewards = inject(RewardService);

  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;

  /* INTERACTIVE TOOL STATE */
  factorialInput: number | null = null;
  factorialResult: number | null = null;

  permN: number | null = null;
  permR: number | null = null;
  permResult: number | null = null;

  combN: number | null = null;
  combR: number | null = null;
  combResult: number | null = null;

  /* Factorial */
  factorial(n: number): number {
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  onFactorialCalculate(): void {
    if (this.factorialInput === null || this.factorialInput < 0) {
      this.factorialResult = null;
      return;
    }
    this.factorialResult = this.factorial(this.factorialInput);
    confetti();
    this.rewards.add(1);
  }

  /* Permutations */
  onPermutationCalculate(): void {
    if (
      this.permN === null ||
      this.permR === null ||
      this.permN < 0 ||
      this.permR < 0 ||
      this.permR > this.permN
    ) {
      this.permResult = null;
      return;
    }
    this.permResult = this.factorial(this.permN) / this.factorial(this.permN - this.permR);
    confetti();
    this.rewards.add(1);
  }

  /* Combinations */
  onCombinationCalculate(): void {
    if (
      this.combN === null ||
      this.combR === null ||
      this.combN < 0 ||
      this.combR < 0 ||
      this.combR > this.combN
    ) {
      this.combResult = null;
      return;
    }
    this.combResult =
      this.factorial(this.combN) /
      (this.factorial(this.combR) * this.factorial(this.combN - this.combR));

    confetti();
    this.rewards.add(1);
  }

  /* QUIZ QUESTIONS */
  countingQuestions = [
    {
      text: 'How many permutations of 5 objects taken 3 at a time exist?',
      options: ['20', '60', '125', '15'],
      correct: '60',
      explanation:
        'P(5,3) = 5! / 2! = 120 / 2 = 60.'
    },
    {
      text: 'How many subsets does a set with 6 elements have?',
      options: ['6', '12', '32', '64'],
      correct: '64',
      explanation: 'A set of size n has 2^n subsets. 2^6 = 64.'
    }
  ];

  /* ACCORDION CONTROL */
  toggleAll() {
    if (this.isExpanded) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
    this.isExpanded = !this.isExpanded;
  }

  expandAll() {
    this.activeTabs = ['0', '1', '2', '3', '4'];
  }

  collapseAll() {
    this.activeTabs = [];
  }
}

