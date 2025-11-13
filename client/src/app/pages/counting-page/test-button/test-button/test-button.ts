import { Component } from '@angular/core';

@Component({
  selector: 'app-test-button',
  imports: [],
  templateUrl: './test-button.html',
  styleUrl: './test-button.css'
})
export class TestButton {
  count = 0;

  increaseCount() {
    this.count = this.count + 1;
  }

  reset() {
    this.count = 0;
  }
}
