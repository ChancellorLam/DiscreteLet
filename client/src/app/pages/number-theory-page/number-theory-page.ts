import { Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import confetti from 'canvas-confetti';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { RewardService } from '../../core/services/reward-service';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import { RsaChallenge } from '../../shared/rsa-challenge/rsa-challenge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, InputNumberModule, TabsModule, QuizComponent, RsaChallenge, CommonModule],
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
  userDivisibilityAnswer: number | null = null;
  divisibilityFeedback: string | null = null;
    // GCD/LCM Practice Tool
  randomGcdLcmNum1: number | null = null;
  randomGcdLcmNum2: number | null = null;
  userGcdAnswer: number | null = null;
  userLcmAnswer: number | null = null;
  gcdLcmFeedback: string | null = null;
    // Euclidean Algorithm Visualizer
  euclidNum1: number | null = null;
  euclidNum2: number | null = null;
  euclideanSteps: string[] = [];
  currentStepIndex = -1;
  euclideanResult: number | null = null;
  isEuclideanRunning = false;


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

    // Calculate GCD using Euclidean algorithm
  calculateGCD(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
      }
    return a;}

    // Calculate LCM using the formula: LCM(a,b) = (a × b) / GCD(a,b)
  calculateLCM(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    const gcd = this.calculateGCD(a, b);
    return Math.abs(a * b) / gcd;
  }

  // Generate random numbers for GCD/LCM practice
  generateGcdLcmProblem(): void {
    // Generate two random numbers between 2 and 50
    this.randomGcdLcmNum1 = this.getRandomNum(2, 50);
    this.randomGcdLcmNum2 = this.getRandomNum(2, 50);

    // Reset user answers and feedback
    this.userGcdAnswer = null;
    this.userLcmAnswer = null;
    this.gcdLcmFeedback = null;
    console.log('Generated numbers:', this.randomGcdLcmNum1, this.randomGcdLcmNum2);
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

  // Check user's GCD and LCM answers
  onCheckGcdLcm(): void {
    // Validation
    if (this.randomGcdLcmNum1 === null || this.randomGcdLcmNum2 === null) {
      this.gcdLcmFeedback = 'Please generate numbers first!';
      return;
    }

    if (this.userGcdAnswer === null || this.userLcmAnswer === null) {
      this.gcdLcmFeedback = 'Please enter both GCD and LCM answers!';
      return;
    }

    // Calculate correct answers
    const correctGcd = this.calculateGCD(this.randomGcdLcmNum1, this.randomGcdLcmNum2);
    const correctLcm = this.calculateLCM(this.randomGcdLcmNum1, this.randomGcdLcmNum2);

    // Check answers
    const gcdCorrect = this.userGcdAnswer === correctGcd;
    const lcmCorrect = this.userLcmAnswer === correctLcm;
    // Provide feedback
    if (gcdCorrect && lcmCorrect) {
      this.gcdLcmFeedback = `Both answers are correct!`;
      confetti();
      this.rewards.add(2); // Award 2 points for getting both correct
    } else if (gcdCorrect && !lcmCorrect) {
      this.gcdLcmFeedback = `GCD is correct, but LCM is incorrect. The correct LCM is ${correctLcm}.`;
      this.rewards.add(1); // Award 1 point for getting one correct
    } else if (!gcdCorrect && lcmCorrect) {
      this.gcdLcmFeedback = `LCM is correct, but GCD is incorrect. The correct GCD is ${correctGcd}.`;
      this.rewards.add(1); // Award 1 point for getting one correct
    } else {
      this.gcdLcmFeedback = `Both answers are incorrect. GCD = ${correctGcd}, LCM = ${correctLcm}.`;
    }
  }

  // Generate all steps for Euclidean Algorithm
generateEuclideanSteps(a: number, b: number): void {
  this.euclideanSteps = [];
  this.currentStepIndex = -1;
  this.euclideanResult = null;
  this.isEuclideanRunning = true;

  let num1 = Math.abs(a);
  let num2 = Math.abs(b);
  let stepNumber = 1;

  this.euclideanSteps.push(`Finding GCD(${a}, ${b}):`);

  // Generate all steps
  while (num2 !== 0) {
    const quotient = Math.floor(num1 / num2);
    const remainder = num1 % num2;

    this.euclideanSteps.push(
      `Step ${stepNumber}: ${num1} = ${num2} × ${quotient} + ${remainder}`
    );

    num1 = num2;
    num2 = remainder;
    stepNumber++;
  }

  this.euclideanResult = num1;
  this.euclideanSteps.push(`Result: GCD = ${num1}`);
}

// Start the Euclidean Algorithm
startEuclidean(): void {
  if (this.euclidNum1 === null || this.euclidNum2 === null) {
    alert('Please enter both numbers!');
    return;
  }

  if (this.euclidNum1 === 0 && this.euclidNum2 === 0) {
    alert('Both numbers cannot be zero!');
    return;
  }

  this.generateEuclideanSteps(this.euclidNum1, this.euclidNum2);
  this.currentStepIndex = 0; // Show first step (title)
}

// Move to next step
nextEuclideanStep(): void {
  if (this.currentStepIndex < this.euclideanSteps.length - 1) {
    this.currentStepIndex++;

    // If we reached the final result
    if (this.currentStepIndex === this.euclideanSteps.length - 1) {
      this.isEuclideanRunning = false;
      confetti();
      this.rewards.add(2);
    }
  }
}

// Move to previous step
previousEuclideanStep(): void {
  if (this.currentStepIndex > 0) {
    this.currentStepIndex--;
  }
}


// Reset the visualizer
resetEuclidean(): void {
  this.euclidNum1 = null;
  this.euclidNum2 = null;
  this.euclideanSteps = [];
  this.currentStepIndex = -1;
  this.euclideanResult = null;
  this.isEuclideanRunning = false;
}

    /* Quiz questions and answers */
    numberTheoryQuestions = [
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
    }
  ];




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
