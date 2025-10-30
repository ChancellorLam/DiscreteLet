import { Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import confetti from 'canvas-confetti';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { RewardService } from '../../core/reward-service';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';

@Component({
  selector: 'app-number-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, InputNumberModule, TabsModule, QuizComponent],
  templateUrl: './number-theory-page.html',
  styleUrl: './number-theory-page.css'
})
export class NumberTheoryPage {
  private rewards = inject(RewardService);
  activeTabs: string[] = [];
  activeTab= '0';
  isExpanded = false;
  randomNumber: number | null = null;
  randMod: number | null = null;
  primeNumFeedback: string | null = null;
  userModAnswer: number | null = null;
  modFeedback: string | null = null;


// Random Number generator for prime number checker
getRandomNum(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

// Random Mod generator for Mod checker with max of 20
getRandomMod(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

  // prime checker
  isPrime(num: number): boolean {
    if(num <=1 ) return false;
    if(num === 2) return true;
    if (num % 2 === 0) return false;

    for(let i=3; i<=Math.sqrt(num); i+=2){
      if(num%i === 0) return false;
    }
    return true;
  }

  // mod checker
  getModAnswer(): number | null{
    if(this.randomNumber ===null || this.randMod ===null) return null;
    return this.randomNumber % this.randMod;
  }

    onClick(): void {
      const random = this.getRandomNum(1, 999);
      const randomMod = this.getRandomMod(1, 20);
      this.randomNumber = random;
      this.randMod = randomMod;
      this.primeNumFeedback=null;
      console.log('Random number:', random);
    }

    onPrimeAnswer(userGuessPrime: boolean): void{
      if(this.randomNumber ===null) return;

      const actualPrime = this.isPrime(this.randomNumber);

      if(userGuessPrime === actualPrime){
        this.primeNumFeedback = "Correct!";
        confetti();
        this.rewards.add(1);
      }
      else{
        this.primeNumFeedback = "Incorrect. Try again.";
      }
      console.log(this.primeNumFeedback);
    }
    // END prime num checker

    // on Mod Answer
    onModAnswer(userGuessModAnswer: number |null): void{
      if(userGuessModAnswer ===null){
        this.modFeedback = "Please enter an answer"; return;
      }
      const correct = this.getModAnswer();
      if(correct ===null){
        this.modFeedback = "Generate numbers first!";
        return;
      }
      if(userGuessModAnswer == correct){
        this.modFeedback = "Correct!";
        confetti();
        this.rewards.add(1);
      }
      else{
        this.modFeedback = "Incorrect. The correct answer is ${correct}.`";
      }
    }

    /* Quiz questions and answers */
    numberTheoryQuestions = [
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





   // toggling expansion panels 
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