import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import confetti from 'canvas-confetti';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { RewardService } from '../../core/services/reward-service';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import {
  UnitTestTemplate,
  UnitTestConfig
} from '../../shared/unit-test-template/unit-test-template';


export interface CountingQuestion {
  text: string;
  options: string[];
  correct: string;
  explanation?: string;
}

@Component({
  selector: 'app-counting-page',
  imports: [
    CommonModule,
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    TabsModule,
    QuizComponent,
    UnitTestTemplate
  ],
  templateUrl: './counting-page.html',
  styleUrl: './counting-page.css'
})

export class CountingPage {
  private rewards = inject(RewardService);

  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;
  showUnitTest: boolean = false;
  startUnitTest() {
    
  console.log("START UNIT TEST CLICKED");
  this.showUnitTest = true;
}

  
  countingUnitTestConfig: UnitTestConfig = {
    title: 'Counting Unit Test',
    description: 'Test your knowledge of counting principles.',
    passingScore: 70,
    timeLimit: 30,

    questions: [
      
      {
        question: 'If a task can be done in 4 ways and another in 3 ways, how many total outcomes?',
        options: ['7', '12', '24', '1'],
        correctAnswer: 1,
        explanation: 'Basic Counting Principle: 4 × 3 = 12.',
        difficulty: 'easy'
      },
      {
        question: 'What is 5! ?',
        options: ['20', '60', '100', '120'],
        correctAnswer: 3,
        explanation: '5! = 5×4×3×2×1 = 120.',
        difficulty: 'easy'
      },
      {
        question: 'How many permutations of 5 items taken 2 at a time?',
        options: ['10', '20', '30', '50'],
        correctAnswer: 1,
        explanation: 'P(5,2) = 5×4 = 20.',
        difficulty: 'easy'
      },
      {
        question: 'How many subsets does a 3-element set have?',
        options: ['3', '6', '8', '9'],
        correctAnswer: 2,
        explanation: '2³ = 8 subsets.',
        difficulty: 'easy'
      },
      {
        question: 'What is 0! ?',
        options: ['0', '1', 'Undefined', 'Infinity'],
        correctAnswer: 1,
        explanation: '0! is defined as 1.',
        difficulty: 'easy'
      },
      {
        question: 'If you flip a coin 3 times, how many sequences are possible?',
        options: ['3', '6', '8', '9'],
        correctAnswer: 2,
        explanation: '2³ = 8 sequences.',
        difficulty: 'easy'
      },
      {
        question: 'A set with 4 elements has how many subsets?',
        options: ['4', '8', '12', '16'],
        correctAnswer: 3,
        explanation: '2⁴ = 16.',
        difficulty: 'easy'
      },
      {
        question: 'How many 2-digit codes can be formed using digits 0–9?',
        options: ['10', '20', '50', '100'],
        correctAnswer: 3,
        explanation: '10 choices each → 10² = 100.',
        difficulty: 'easy'
      },
      {
        question: 'What is the number of ways to arrange 3 books?',
        options: ['3', '6', '9', '12'],
        correctAnswer: 1,
        explanation: '3! = 6.',
        difficulty: 'easy'
      },
      {
        question: 'How many combinations C(5,2) exist?',
        options: ['5', '10', '15', '20'],
        correctAnswer: 1,
        explanation: 'C(5,2) = 10.',
        difficulty: 'easy'
      },
      {
        question: 'How many outcomes when rolling a die 2 times?',
        options: ['6', '12', '18', '36'],
        correctAnswer: 3,
        explanation: '6×6 = 36.',
        difficulty: 'easy'
      },
      {
        question: 'How many 4-digit PINs (digits may repeat)?',
        options: ['4000', '9999', '10000', '5000'],
        correctAnswer: 2,
        explanation: '10⁴ = 10,000.',
        difficulty: 'easy'
      },
      {
        question: 'How many subsets of size 1 from {a,b,c}? ',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2,
        explanation: 'There are 3 single-element subsets.',
        difficulty: 'easy'
      },
      {
        question: 'How many permutations of 6 unique items?',
        options: ['120', '360', '720', '1440'],
        correctAnswer: 2,
        explanation: '6! = 720.',
        difficulty: 'easy'
      },
      {
        question: 'How many combinations of 6 choose 3?',
        options: ['10', '15', '20', '30'],
        correctAnswer: 1,
        explanation: 'C(6,3) = 20.',
        difficulty: 'easy'
      },

      
      {
        question: 'How many 4-letter permutations using A–G (7 letters)?',
        options: ['720', '840', '1680', '2401'],
        correctAnswer: 2,
        explanation: 'P(7,4) = 7×6×5×4 = 840.',
        difficulty: 'hard'
      },
      {
        question: 'How many subsets of size 3 from a 10-element set?',
        options: ['30', '60', '90', '120'],
        correctAnswer: 3,
        explanation: 'C(10,3) = 120.',
        difficulty: 'hard'
      },
      {
        question: 'How many 5-digit codes where repetition is NOT allowed?',
        options: ['30240', '50400', '99999', '100000'],
        correctAnswer: 0,
        explanation: 'P(10,5) = 10×9×8×7×6 = 30,240.',
        difficulty: 'hard'
      },
      {
        question: 'How many ways to arrange the letters in “BALLOON”?',
        options: ['840', '1260', '2520', '5040'],
        correctAnswer: 1,
        explanation: '7! / (2!2!) = 1260.',
        difficulty: 'hard'
      },
      {
        question: 'How many functions from a 4-element set to a 3-element set?',
        options: ['12', '24', '36', '81'],
        correctAnswer: 3,
        explanation: '3⁴ = 81.',
        difficulty: 'hard'
      },
      {
        question: 'How many subsets of size 5 does a 12-element set have?',
        options: ['792', '950', '1200', '4096'],
        correctAnswer: 0,
        explanation: 'C(12,5) = 792.',
        difficulty: 'hard'
      },
      {
        question: 'How many permutations of the word “MISSISSIPPI”?',
        options: ['34650', '4989600', '34650', '113400'],
        correctAnswer: 3,
        explanation: '11! / (4!4!2!) = 34,650.',
        difficulty: 'hard'
      },
      {
        question: 'How many 6-person committees from 20 people?',
        options: ['38760', '15504', '23200', '100000'],
        correctAnswer: 0,
        explanation: 'C(20,6) = 38,760.',
        difficulty: 'hard'
      },
      {
        question: 'How many permutations of selecting 4 from 12?',
        options: ['11880', '95040', '7260', '3960'],
        correctAnswer: 1,
        explanation: 'P(12,4) = 12×11×10×9 = 11,880.',
        difficulty: 'hard'
      },
      {
        question: 'How many ways to seat 8 people around a round table?',
        options: ['5040', '40320', '720', '504'],
        correctAnswer: 2,
        explanation: '(n–1)! = 7! = 5040.',
        difficulty: 'hard'
      },
      {
        question: 'How many integer solutions to x+y+z=10 with x,y,z ≥ 0?',
        options: ['36', '45', '55', '66'],
        correctAnswer: 3,
        explanation: 'Stars & Bars: C(10+3–1,3–1)=C(12,2)=66.',
        difficulty: 'hard'
      },
      {
        question: 'How many 8-bit strings contain exactly 3 ones?',
        options: ['28', '56', '112', '336'],
        correctAnswer: 1,
        explanation: 'C(8,3) = 56.',
        difficulty: 'hard'
      },
      {
        question: 'How many 5-card hands from a 52-card deck?',
        options: ['100,000', '1,098,240', '2,598,960', '5,598,960'],
        correctAnswer: 2,
        explanation: 'C(52,5) = 2,598,960.',
        difficulty: 'hard'
      },
      {
        question: 'How many permutations of selecting 6 from 15?',
        options: ['360,360', '500,500', '720,720', '1,458,000'],
        correctAnswer: 0,
        explanation: 'P(15,6) = 15×14×13×12×11×10 = 360,360.',
        difficulty: 'hard'
      },
      {
        question: 'How many 6-digit numbers have all digits distinct?',
        options: ['100000', '151200', '300000', '720000'],
        correctAnswer: 1,
        explanation: 'P(10,6) = 151,200.',
        difficulty: 'hard'
      }
    ]
  };

 

  factorialInput: number | null = null;
  factorialResult: number | null = null;

  permN: number | null = null;
  permR: number | null = null;
  permResult: number | null = null;

  combN: number | null = null;
  combR: number | null = null;
  combResult: number | null = null;

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
    this.permResult =
      this.factorial(this.permN) /
      this.factorial(this.permN - this.permR);
    confetti();
    this.rewards.add(1);
  }

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
      (this.factorial(this.combR) *
        this.factorial(this.combN - this.combR));
    confetti();
    this.rewards.add(1);
  }

  

  countingQuestionPool: CountingQuestion[] = [
    {
      text: "If a task can be done in 5 ways and another in 3 ways, how many total outcomes are possible?",
      options: ["2", "8", "15", "53"],
      correct: "15",
      explanation: "By the Basic Counting Principle: 5 × 3 = 15."
    },
    {
      text: "What is 6! (6 factorial)?",
      options: ["36", "120", "720", "5040"],
      correct: "720",
      explanation: "6! = 6×5×4×3×2×1 = 720."
    },
    {
      text: "How many permutations of 4 items taken 2 at a time exist?",
      options: ["6", "8", "12", "20"],
      correct: "12",
      explanation: "P(4,2) = 4×3 = 12."
    },
    {
      text: "How many combinations of 7 items taken 3 at a time exist?",
      options: ["21", "35", "42", "140"],
      correct: "35",
      explanation: "C(7,3) = 35."
    },
    {
      text: "A set with 5 elements has how many subsets?",
      options: ["5", "10", "25", "32"],
      correct: "32",
      explanation: "2⁵ = 32."
    },
    {
      text: "How many 3-digit codes can be formed using digits 0–9 (digits may repeat)?",
      options: ["100", "500", "720", "1000"],
      correct: "1000",
      explanation: "10 digits each → 10³ = 1000."
    },
    {
      text: "How many ways can 8 runners finish in 1st, 2nd, and 3rd place?",
      options: ["24", "56", "336", "720"],
      correct: "336",
      explanation: "P(8,3) = 8×7×6 = 336."
    },
    {
      text: "What is the value of 0! ?",
      options: ["0", "1", "Undefined", "Cannot be computed"],
      correct: "1",
      explanation: "0! = 1 by definition."
    },
    {
      text: "How many subsets of size 2 can be selected from a set of 6 elements?",
      options: ["6", "12", "15", "30"],
      correct: "15",
      explanation: "C(6,2) = 15."
    },
    {
      text: "How many ways can 4 books be arranged on a shelf?",
      options: ["4", "12", "16", "24"],
      correct: "24",
      explanation: "4! = 24."
    }
  ];

  countingQuestions: CountingQuestion[] = [];

  constructor() {
    this.selectRandomCountingQuestions(5);
  }

  selectRandomCountingQuestions(count = 5): void {
    const shuffled = [...this.countingQuestionPool].sort(
      () => Math.random() - 0.5
    );
    this.countingQuestions = shuffled.slice(0, count);
  }

  refreshCountingQuiz() {
    this.selectRandomCountingQuestions(5);
  }

 

  toggleAll() {
    if (this.isExpanded) this.collapseAll();
    else this.expandAll();

    this.isExpanded = !this.isExpanded;
  }

  expandAll() {
    this.activeTabs = ['0', '1', '2', '3', '4'];
  }

  collapseAll() {
    this.activeTabs = [];
  }
  

}
