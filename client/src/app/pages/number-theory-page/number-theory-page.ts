import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-number-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule],
  templateUrl: './number-theory-page.html',
  styleUrl: './number-theory-page.css'
})
export class NumberTheoryPage {
  activeTabs: string[] = [];
  isExpanded = false;
  randomNumber: number | null = null;
  primeNumFeedback: string | null = null;


// Random Number generator for prime number checker
getRandomNum(min: number, max: number): number {
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

    onClick(): void {
      const random = this.getRandomNum(1, 999);
      this.randomNumber = random;
      this.primeNumFeedback=null;
      console.log('Random number:', random);
    }

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


//   // Calculate the greatest common divisor (GCD)
// const gcdResult = math.gcd(36, 48); // 12
// console.log(gcdResult);

// // Calculate the least common multiple (LCM)
// const lcmResult = math.lcm(12, 18); // 36
// console.log(lcmResult);

// // Works with multiple numbers
// const multiLcm = math.lcm(1, 3, 4, 5); // 60
// console.log(multiLcm);