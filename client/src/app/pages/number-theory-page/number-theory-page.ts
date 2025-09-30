import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule} from '@angular/forms';
import { ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-number-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule],
  templateUrl: './number-theory-page.html',
  styleUrl: './number-theory-page.css'
})
export class NumberTheoryPage {
  activeTabs: string[] = [];
  isExpanded = false;

//   // Calculate the greatest common divisor (GCD)
// const gcdResult = math.gcd(36, 48); // 12
// console.log(gcdResult);

// // Calculate the least common multiple (LCM)
// const lcmResult = math.lcm(12, 18); // 36
// console.log(lcmResult);

// // Works with multiple numbers
// const multiLcm = math.lcm(1, 3, 4, 5); // 60
// console.log(multiLcm);

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
