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

//defines structure for quiz questions
interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation: string;
}

@Component({
  selector: 'app-number-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, InputNumberModule, TabsModule, QuizComponent],
  templateUrl: './number-theory-page.html',
  styleUrl: './number-theory-page.css'
})
export class NumberTheoryPage {
  //inject reward service to track user progress
  private rewards = inject(RewardService);

  activeTabs: string[] = []; //tracks which accordion panels are open
  activeTab= '0'; //currently selected tab
  isExpanded = false; //tracks if all accordion panels are expanded

  randomNumber: number | null = null; // Stores the generated random number for exercises
  randMod: number | null = null; // Stores the generated random modulus for exercises
  primeNumFeedback: string | null = null; // Displays feedback for prime number checker
  userModAnswer: number | null = null; // Stores user's answer for mod exercise
  modFeedback: string | null = null; // Displays feedback for mod exercise
  userDivisibilityAnswer: number | null = null; // Stores user's answer for divisibility exercise
  divisibilityFeedback: string | null = null; // Displays feedback for divisibility exercise


// Random Number generator for prime number checker
// Generates a random integer between min and max (inclusive)
getRandomNum(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

// Random Mod generator for Mod checker with max of 20
// Generates a random modulus between min and max (inclusive)
getRandomMod(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

  // prime num checker
  // Determines if a given number is prime
  isPrime(num: number): boolean {
    if(num <=1 ) return false;    // Exclude 0, 1, and negatives
    if(num === 2) return true;    // 2 is prime
    if (num % 2 === 0) return false;    // Exclude even numbers > 2
    
    // Check divisibility by odd numbers up to √num
    for(let i=3; i<=Math.sqrt(num); i+=2){
      if(num%i === 0) return false;
    }
    return true;
  }

  // mod checker
  // Returns the correct mod result for the generated random number and modulus
  getModAnswer(): number | null{
    if(this.randomNumber ===null || this.randMod ===null) return null;
    return this.randomNumber % this.randMod;
  }

  // int & divisibility
  divisibility(num1: number, num2: number): number {
    const answer = num1/num2;
    return answer
  }

    // EVENT HANDLERS
    // Called when "Generate Number" is clicked — sets random values
    onClick(): void {
      const random = this.getRandomNum(1, 999);
      const randomMod = this.getRandomMod(1, 20);
      this.randomNumber = random;
      this.randMod = randomMod;
      this.primeNumFeedback=null;   // Reset feedback
      console.log('Random number:', random);
    }

    // Handles user's "Yes"/"No" response for prime number check
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
    }
    // END prime num checker

   // Handles user input for modular arithmetic checker
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
        // Use template literal correctly to show actual result
        this.modFeedback = "Incorrect. The correct answer is ${correct}.`";
      }
    }

    // handles user input for divisibility tool
    onDivisibilityAnswer(userGuessDivisibility: number | null): void{
      if(userGuessDivisibility ===null){
        this.divisibilityFeedback = "Please enter an answer"; return;
      }
      if (this.randomNumber === null || this.randMod === null) {
        this.divisibilityFeedback = 'Generate numbers first!';
        return;
    }

      const num = this.randomNumber;
      const den = this.randMod;
      const quotient = Math.floor(num / den);
      const remainder = num % den;

    // Exact division case
    if (remainder === 0) {
      if (userGuessDivisibility === quotient) {
        this.divisibilityFeedback = `Correct! ${num} is divisible by ${den}, quotient = ${quotient}.`;
        confetti();
        this.rewards.add(1);
      } 
      else {
        this.divisibilityFeedback = `Incorrect. ${num} ÷ ${den} = ${quotient}.`;
      }
      return;
    }

    // Not exactly divisible — accept either quotient or remainder depending on UI expectation
    if (userGuessDivisibility === remainder) {
      this.divisibilityFeedback = `Correct! Remainder = ${remainder}.`;
      confetti();
      this.rewards.add(1);
    } 
    else if (userGuessDivisibility === quotient) {
      this.divisibilityFeedback = `Correct! Quotient = ${quotient}.`;
      confetti();
      this.rewards.add(1);
    } 
    else {
      this.divisibilityFeedback = `Not divisible. Quotient = ${quotient}, remainder = ${remainder}.`;
    }
  }


    // Quiz questions and answers
    numberTheoryQuestionPool: Question[] = [
    {
      text: 'Which of the following best describes the main focus of number theory?',
      options: [
        'Studying shapes and angles',
        'Analyzing integer properties and relationships',
        'Measuring continuous change',
        'Calculating probabilities'
      ],
      correct: 'Analyzing integer properties and relationships',
      explanation:
        'Number theory focuses on integers, their divisibility, primes, and related structures—it’s the “arithmetic” branch of pure mathematics.'
    },
    {
      text: 'If a=20 and b=5, which statement is true?',
      options: ['a|b', 'b|a', 'Both divide each other', 'Neither divides the other'],
      correct: 'b|a',
      explanation:
        '5 divides 20 evenly (20/5=4, so b|a means "b divides a."'
    },
    {
      text: 'What is the GCD of 252 and 198?',
      options: ['9', '12', '18', '36'],
      correct: '18',
      explanation: 'Using the Euclidean Algorithm, the last nonzero remainder is 18, so gcd(252, 198) = 18.'
    },
    {
      text: 'Which of the following statements about prime numbers is true?',
      options: ['1 is a prime number', 'Every even number is prime', 'A prime has exactly two positive divisors', 'Primes have no divisors at all'],
      correct: 'A prime has exactly two positive divisors',
      explanation: 'By definition, a prime number has only two divisors: 1 and itself (e.g., 5 -> {1,5}).'
    },
    {
      text: 'In modular arithmetic, what does 17 ≡ 5 (mod 12) mean?',
      options: ['17 and 5 are both prime numbers', '17 and 5 leave the same remainder when divided by 12', '17 is a multiple of 5', '17 and 12 have a GCD of 5'],
      correct: '17 is a multiple of 5',
      explanation: 'Both 17 and 5 give remainder 5 when divided by 12, so they are congruent modulo 12.'
    },
    {
      text: 'Fermats Little Theorem states that for a prime number p and integer a...',
      options: ['aᵖ = 1', 'aᵖ⁻¹ ≡ 1 (mod p)', 'aᵖ - a is always even', 'aᵖ⁺¹ ≡ 0 (mod p)'],
      correct: 'aᵖ⁻¹ ≡ 1 (mod p)',
      explanation: 'This theorem shows how primes behave in modular arithmetic and is fundamental to cryptography.'
    },
    {
      text: 'Why are prime numbers important in the RSA encryption algorithm?',
      options: ['They make calculations faster', 'They simplify addition and subtraction', 'They make it easy to factor large numbers', 'They make it difficult to reverse the encryption process'],
      correct: 'They make it difficult to reverse the encryption process',
      explanation: 'RSA relies on the fact that factoring the product of large primes is computationally hard, securing modern digitial communication.'
    },
    {
      text: 'Which number is prime?',
      options: ['21', '29', '33', '51'],
      correct: '29',
      explanation: '29 has exactly two positive divisors.'
    },
    {
      text: 'Compute 19mod6.',
      options: ['1', '3', '5', '6'],
      correct: '1',
      explanation: 'When you divide 19 by 6, you get 3 with a remainder of 1, because 6 × 3 = 18, and 19 − 18 = 1.'
    }, 
    {
      text: 'The Fundamental Theorem of Arithmetic states:',
      options: ['Every integer has infinitely many factorizations', 'Every integer >= 2 has a unique prime factorization',
        'Every prime is even', 'Every integer is divisible by a prime'],
      correct: 'Every integer >= 2 has a unique prime factorization',
      explanation: 'Prime factorizations are unique up to order.'
    }
  ];

  //displayed questions, randomly select from pool
  numberTheoryQuestions: Question[] = [];

  constructor(){
    //initialize with random questions when component is created
    this.selectRandomQuestions(5);
  }

  //randomly selects n questions from the question pool
  //count num questions to select (default is 5)
  selectRandomQuestions(count = 5): void {
    //create a copy of the pool and shuffle it
    const shuffled = [...this.numberTheoryQuestionPool].sort(() => Math.random() -0.5);
    //take the first count questions
    this.numberTheoryQuestions = shuffled.slice(0, Math.min(count, this.numberTheoryQuestionPool.length));
  }

  //refresh quiz with new random questions
  refreshQuiz(): void {
    this.selectRandomQuestions(5);
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
    this.activeTabs = ['0', '1', '2', '3', '4', '5', '6'];
  }

  collapseAll() {
    this.activeTabs = [];
  }
}