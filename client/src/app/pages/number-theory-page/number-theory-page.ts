import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import confetti from 'canvas-confetti';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-theory-page',   // Component selector used in templates
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, InputNumberModule],
  templateUrl: './number-theory-page.html',   // HTML template file
  styleUrl: './number-theory-page.css'    // CSS styles for this component
})
export class NumberTheoryPage {
  // Accordion state management
  activeTabs: string[] = [];    // Stores currently expanded accordion panels
  isExpanded = false;   // Tracks whether all panels are expanded
  
  // Variables for Prime Checker and Mod Checker tools
  randomNumber: number | null = null;   // Holds generated random number
  randMod: number | null = null;    // Holds generated modulus value
  primeNumFeedback: string | null = null;   // Feedback for prime number quiz
  userModAnswer: number | null = null;    // User’s input for mod result
  modFeedback: string | null = null;    // Feedback for mod answer


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
      }
      else{
        this.primeNumFeedback = "Incorrect. Try again.";
      }
      console.log(this.primeNumFeedback);
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
      }
      else{
        // Use template literal correctly to show actual result
        this.modFeedback = "Incorrect. The correct answer is ${correct}.`";
      }
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